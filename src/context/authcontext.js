import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";
// import getUserByUserId from "../Firebase/getUserByUserId";

const Authcontext = React.createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export function Authprovider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  //signup function

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //update profile
  async function update(username) {
    await updateProfile(auth.currentUser, { displayName: username });
    let user = auth.currentUser;
    setCurrentUser(user);
  }

  async function updateForGoogleLogin() {
    await updateProfile(auth.currentUser);
    let user = auth.currentUser;
    setCurrentUser(user);
  }

  //signin function
  function signin(email, password) {
    setPersistence(getAuth(), browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  //signout function
  function signout() {
    return signOut(auth);
  }

  function changePassword(user, userEmail, oldPassword, newPassword) {
    const credential = EmailAuthProvider.credential(userEmail, oldPassword);
    return reauthenticateWithCredential(user, credential)
      .then(() => {
        return updatePassword(user, newPassword)
          .then(() => {
            return "Password updated successfully";
          })
          .catch((error) => {
            return error.message;
          });
      })
      .catch((error) => {
        return error.message;
      });
  }

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(auth, provider);

  const value = {
    currentUser,
    signin,
    signout,
    signup,
    update,
    changePassword,
    signInWithGoogle,
    updateForGoogleLogin,
  };

  return (
    <Authcontext.Provider value={value}>
      {!loading && children}
    </Authcontext.Provider>
  );
}
