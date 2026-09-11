import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth, 
  Auth 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUbO3LW-9uvpYoUBZgXaD_f0nEZ962n6A",
  authDomain: "luminar-2e85f.firebaseapp.com",
  projectId: "luminar-2e85f",
  storageBucket: "luminar-2e85f.firebasestorage.app",
  messagingSenderId: "258489289039",
  appId: "1:258489289039:web:06666e502264cf7afb5d3a"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
