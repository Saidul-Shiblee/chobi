import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";
const Authcontext = React.createContext();

export function useAuth() {
  console.log("hi there");
  return useContext(Authcontext);
}

export function Authprovider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  //useeffect

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //signup function

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);

    //update profile
  }

  async function update(username) {
    await updateProfile(auth.currentUser, { displayName: username });
    let user = auth.currentUser;
    setCurrentUser({ ...user });
  }

  //signin function
  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //signout function
  function signout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    signin,
    signout,
    signup,
    update,
  };

  return (
    <Authcontext.Provider value={value}>
      {!loading && children}
    </Authcontext.Provider>
  );
}
