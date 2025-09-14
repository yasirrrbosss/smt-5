'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ref, push, set, remove, onValue, off } from 'firebase/database';
import { database } from '../lib/firebase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ItemsContext = createContext({});

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};

export const ItemsProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setItems([]);
      return;
    }

    setLoading(true);
    const itemsRef = ref(database, `items/${user.uid}`);
    
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([id, item]) => ({
          id,
          ...item
        }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
      setLoading(false);
    });

    return () => {
      off(itemsRef);
      unsubscribe();
    };
  }, [user?.uid]);

  const addItem = async (itemData) => {
    if (!user?.uid) {
      toast.error('You must be logged in to add items');
      return;
    }

    try {
      const itemsRef = ref(database, `items/${user.uid}`);
      const newItemRef = push(itemsRef);
      
      const item = {
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.uid
      };

      await set(newItemRef, item);
      toast.success('Item added successfully!');
      return newItemRef.key;
    } catch (error) {
      toast.error('Failed to add item: ' + error.message);
      throw error;
    }
  };

  const updateItem = async (itemId, itemData) => {
    if (!user?.uid) {
      toast.error('You must be logged in to update items');
      return;
    }

    try {
      const itemRef = ref(database, `items/${user.uid}/${itemId}`);
      const updatedItem = {
        ...itemData,
        updatedAt: new Date().toISOString(),
        userId: user.uid
      };

      await set(itemRef, updatedItem);
      toast.success('Item updated successfully!');
    } catch (error) {
      toast.error('Failed to update item: ' + error.message);
      throw error;
    }
  };

  const deleteItem = async (itemId) => {
    if (!user?.uid) {
      toast.error('You must be logged in to delete items');
      return;
    }

    try {
      const itemRef = ref(database, `items/${user.uid}/${itemId}`);
      await remove(itemRef);
      toast.success('Item deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete item: ' + error.message);
      throw error;
    }
  };

  const getItemById = (itemId) => {
    return items.find(item => item.id === itemId);
  };

  const getItemsByCategory = (category) => {
    return items.filter(item => 
      item.category?.toLowerCase() === category.toLowerCase()
    );
  };

  const searchItems = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return items.filter(item => 
      item.name?.toLowerCase().includes(lowercaseQuery) ||
      item.description?.toLowerCase().includes(lowercaseQuery) ||
      item.category?.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getCategories = () => {
    const categories = items.map(item => item.category).filter(Boolean);
    return [...new Set(categories)];
  };

  const getStats = () => {
    const totalItems = items.length;
    const categories = getCategories().length;
    const recentItems = items
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return {
      totalItems,
      categories,
      recentItems
    };
  };

  const value = {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    getItemsByCategory,
    searchItems,
    getCategories,
    getStats
  };

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
};