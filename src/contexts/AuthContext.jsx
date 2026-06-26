import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext();

const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          // Tự động tạo profile cho admin lần đầu đăng nhập
          if (user.uid === ADMIN_UID) {
            const adminProfile = {
              email: user.email,
              role: 'admin',
              isLocked: false,
              createdAt: new Date().toISOString(),
            };
            await setDoc(userRef, adminProfile);
            setCurrentUser(user);
            setUserProfile(adminProfile);
          } else {
            // Tài khoản không có trong hệ thống
            await signOut(auth);
            setCurrentUser(null);
            setUserProfile(null);
          }
        } else {
          const profile = userDoc.data();
          if (profile.isLocked) {
            await signOut(auth);
            setCurrentUser(null);
            setUserProfile(null);
          } else {
            setCurrentUser(user);
            setUserProfile(profile);
          }
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
