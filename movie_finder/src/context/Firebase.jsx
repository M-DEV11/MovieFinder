import { createContext, useContext, useState, useEffect, use } from "react";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {getFirestore,addDoc,collection,getDocs} from "firebase/firestore";

const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyDwOApfV4sn0Pi0PxY6JGTa3_EjUTTCagU",
  authDomain: "moviefinder-14b44.firebaseapp.com",
  projectId: "moviefinder-14b44",
  storageBucket: "moviefinder-14b44.firebasestorage.app",
  messagingSenderId: "187006320135",
  appId: "1:187006320135:web:047ccdcb4f960e19e3b4a2"
};

export const useFirebase=()=>useContext(FirebaseContext);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvier= new GoogleAuthProvider();



export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
}

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
}

export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvier);
}

const addToWatchlist = async (movie) => {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }
  try {
    const userId = auth.currentUser.uid;
    const watchlistRef = collection(db, "watchlists", userId, "movies");
    await addDoc(watchlistRef, movie);
    console.log("Movie added to watchlist:", movie);
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
  }
}

const fetchWatchlist = async () => {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return [];
  }
  try {
    const userId = auth.currentUser.uid;
    const watchlistRef = collection(db, "watchlists", userId, "movies");
    const querySnapshot = await getDocs(watchlistRef);  
    const watchlist = [];
    querySnapshot.forEach((doc) => { 
      watchlist.push({ id: doc.id, ...doc.data() });
    });
    return watchlist; 
  } catch (error) {
    console.error("Error retrieving watchlist:", error);
    return [];
  }
}

export const logoutUser = async () => {
  await signOut(auth);
  console.log("User logged out");
}

export const FirebaseProvider = (props)=>{
  const [user, setUser] = useState(null);

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
}, []);

const isLoggedIn = (user)? true : false;

  return (
    <FirebaseContext.Provider value={{registerUser,loginUser,loginWithGoogle,isLoggedIn, user,logoutUser,addToWatchlist, fetchWatchlist}}>
      {props.children} 
    </FirebaseContext.Provider>
  )
}