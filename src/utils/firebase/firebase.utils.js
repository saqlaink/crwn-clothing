import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy1_NLKztnAAFtOX9IRNrGiYcbz-eDNfM",
  authDomain: "crwn-clothing-db-68b3d.firebaseapp.com",
  projectId: "crwn-clothing-db-68b3d",
  storageBucket: "crwn-clothing-db-68b3d.appspot.com",
  messagingSenderId: "532103601063",
  appId: "1:532103601063:web:2955c71fb9e86de489b482",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`error creating the user`, error.message);
    }
  }

  return userDocRef;
};
