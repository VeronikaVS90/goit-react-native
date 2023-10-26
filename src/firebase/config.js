import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCiTnUiHIVFbWvQ62rPHgFu3_-r5cEmMPA",
  authDomain: "awesome-project-af752.firebaseapp.com",
  projectId: "awesome-project-af752",
  storageBucket: "awesome-project-af752.appspot.com",
  messagingSenderId: "288005437998",
  appId: "1:288005437998:web:2218efa144c14d98977dbf",
  measurementId: "G-RWH1PVPMSK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);