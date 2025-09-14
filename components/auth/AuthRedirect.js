'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthLoading from './AuthLoading';

const AuthRedirect = ({ children, requireAuth = false, redirectTo = '/dashboard' }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // User harus login tapi tidak ada user
        router.push('/login');
      } else if (!requireAuth && user) {
        // User sudah login tapi mengakses halaman auth
        router.push(redirectTo);
      }
    }
  }, [user, loading, requireAuth, redirectTo, router]);

  if (loading) {
    return <AuthLoading />;
  }

  // Jika requireAuth tapi tidak ada user, jangan render children
  if (requireAuth && !user) {
    return <AuthLoading />;
  }

  // Jika tidak requireAuth tapi ada user, jangan render children
  if (!requireAuth && user) {
    return <AuthLoading />;
  }

  return children;
};

export default AuthRedirect;