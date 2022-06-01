import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";
import { getUserByUserId } from "../Firebase/getUserByUserId";
const Authcontext = React.createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export function Authprovider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  console.log(currentUser);
  //useeffect

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let otherInfo = await getUserByUserId(user.auth.currentUser.uid);

      setCurrentUser({ ...user, otherInfo });

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

  const value = {
    currentUser,
    signin,
    signout,
    signup,
    update,
    changePassword,
  };

  return (
    <Authcontext.Provider value={value}>
      {!loading && children}
    </Authcontext.Provider>
  );
}
