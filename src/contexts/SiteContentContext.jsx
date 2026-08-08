import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const SiteContentContext = createContext({ images: {}, loading: true });

export function SiteContentProvider({ children }) {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'siteContent', 'images'),
      (snap) => {
        setImages(snap.exists() ? snap.data() : {});
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, []);

  return (
    <SiteContentContext.Provider value={{ images, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function useSiteImage(key, fallback) {
  const { images } = useSiteContent();
  return images[key] || fallback;
}
