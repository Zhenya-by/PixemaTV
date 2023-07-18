import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export const useAuth = () => {
  const auth = getAuth();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setIsAuth(!!user); 
    });

    return () => unsubscribe(); 
  }, [auth]);

  return { isAuth };
};