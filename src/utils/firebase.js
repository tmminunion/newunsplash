import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  // Masukkan konfigurasi Firebase Anda di sini
  apiKey: "AIzaSyDGlSPFgZOH2YvyyfM6RvINum85HO3iy7A",
  authDomain: "bt-image.firebaseapp.com",
  databaseURL:
    "https://bt-image-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bt-image",
  storageBucket: "bt-image.appspot.com",
  messagingSenderId: "19994844429",
  appId: "1:19994844429:web:aae5f47a25d72e9df8e444",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default database;
