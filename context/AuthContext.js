'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom Alert Component
const CustomAlert = ({ alert, onClose }) => {
  if (!alert) return null;

  const isSuccess = alert.type === 'success';
  const isError = alert.type === 'error';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center shadow-xl">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isSuccess ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {isSuccess ? (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
        </div>
        
        <h3 className={`text-lg font-semibold mb-2 ${
          isSuccess ? 'text-green-800' : 'text-red-800'
        }`}>
          {isSuccess ? 'Success' : 'Error'}
        </h3>
        
        <p className="text-gray-600 mb-4">{alert.message}</p>
        
        <button
          onClick={onClose}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isSuccess 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [isLoginProcess, setIsLoginProcess] = useState(false);

  // Show custom alert
  const showAlert = (type, message, isLoginSuccess = false) => {
    setAlert({ type, message, isLoginSuccess, countdown: 5 });
    
    if (isLoginSuccess) {
      // Start countdown for login success
      let timeLeft = 5;
      const countdownInterval = setInterval(() => {
        timeLeft--;
        setAlert(prev => prev ? ({ ...prev, countdown: timeLeft }) : null);
        
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          setAlert(null);
          setIsLoginProcess(false);
          // Redirect to dashboard
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard';
          }
        }
      }, 1000);
      
      // Store interval ID to clear if user closes manually
      setAlert(prev => prev ? ({ ...prev, intervalId: countdownInterval }) : null);
    } else {
      // Auto close after 3 seconds for non-login alerts
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  const closeAlert = () => {
    if (alert?.intervalId) {
      clearInterval(alert.intervalId);
    }
    
    if (alert?.isLoginSuccess) {
      // If login success alert is closed manually, redirect immediately
      setAlert(null);
      setIsLoginProcess(false);
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
    } else {
      setAlert(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Prevent auto-redirect during login process - wait for manual redirect
      if (isLoginProcess) {
        return;
      }

      if (user) {
        // Get additional user data from Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          ...userData
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isLoginProcess]);

  const register = async (email, password, name) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(user, {
        displayName: name
      });

      // Save additional user data to Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        name,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      showAlert('success', 'Account created successfully!');
      return user;
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setIsLoginProcess(true); // Prevent auto-redirect from onAuthStateChanged
      
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // Small delay to ensure UI is ready
      setTimeout(() => {
        showAlert('success', 'Logged in successfully!', true);
      }, 100);
      
      return user;
    } catch (error) {
      setIsLoginProcess(false);
      showAlert('error', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      
      // Small delay to ensure UI is ready
      setTimeout(() => {
        showAlert('success', 'Logged out successfully!', false, true);
      }, 100);
    } catch (error) {
      showAlert('error', error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <CustomAlert alert={alert} onClose={closeAlert} />
    </AuthContext.Provider>
  );
};