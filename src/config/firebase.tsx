import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDoyfHfsGLDpGReVKD3koWi1ZddXgF4edc",
  authDomain: "unity-data-base-628a9.firebaseapp.com",
  projectId: "unity-data-base-628a9",
  storageBucket: "unity-data-base-628a9.appspot.com",
  messagingSenderId: "843367747957",
  appId: "1:843367747957:web:9e2f4a921b9b1b9138033c",
  measurementId: "G-251GNQWF72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const dataBase = getDatabase(); // Real DataBase
export const playersRef = (playersRef: string) => ref(dataBase, `unityMembers/${playersRef}`);
export const dataRef = ref(dataBase); // Real DataBase
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
