import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1NM_p4Om1-IQXxCcx7m2GzjQ-EK86Rr0",
  authDomain: "move-it-688b5.firebaseapp.com",
  projectId: "move-it-688b5",
  storageBucket: "move-it-688b5.appspot.com",
  messagingSenderId: "286088329048",
  appId: "1:286088329048:web:d00ca729197225ff55572d",
  measurementId: "G-PYB34R6GYR"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
      console.log("user created!");
      console.log(user);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const updateUserDocument = async (user, additionalData) => {
  if (!user) return;

  try {
    const userRef = firestore.doc(`users/${user.uid}`);
    const { level, experience, challengesCompleted } = additionalData;
    await userRef.update({
      ...user,
      level: level,
      experience: experience,
      challengesCompleted: challengesCompleted
    });

    return getUserDocument(user.uid);
  } catch (error) {
    console.error("Error updating user", error);
  }
}