import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDT3nLV3ddfw_g7L01v9abfJgjBmHneQMg",
  authDomain: "oldrajindernagar-b71b8.firebaseapp.com",
  databaseURL: "https://oldrajindernagar-b71b8-default-rtdb.firebaseio.com",
  projectId: "oldrajindernagar-b71b8",
  storageBucket: "oldrajindernagar-b71b8.appspot.com",
  messagingSenderId: "566806197782",
  appId: "1:566806197782:web:24e45c585ab79f66716737",
  measurementId: "G-F9MLERQZ17"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app)
const storage = getStorage(app)

export { database, ref, onValue, storage, auth };
