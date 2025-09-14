// app/layout.js
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';
import { ItemsProvider } from '../context/ItemsContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Personal Item Manager',
  description: 'Manage your personal inventory with ease',
  keywords: 'inventory, items, management, personal, organize',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ItemsProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ItemsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}