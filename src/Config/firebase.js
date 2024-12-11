// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBFm2b7O0wmR3xmnae0QHzmraJ5XIe68n8",
	authDomain: "vite-contact-49d55.firebaseapp.com",
	projectId: "vite-contact-49d55",
	storageBucket: "vite-contact-49d55.firebasestorage.app",
	messagingSenderId: "415648278381",
	appId: "1:415648278381:web:67e3aabcfb3557bd1d5c64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);