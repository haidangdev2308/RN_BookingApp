
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCFD3iNNe9QtJJ1THgF8IQ9HT7Z7V2b9BQ",
    authDomain: "booking-prj-6018f.firebaseapp.com",
    projectId: "booking-prj-6018f",
    storageBucket: "booking-prj-6018f.appspot.com",
    messagingSenderId: "913054656610",
    appId: "1:913054656610:web:d25157a9e3c8ed6302493b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore()

export { auth, db }