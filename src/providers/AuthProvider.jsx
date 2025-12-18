import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider(); 

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null);

  // register user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = ()=>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
  }
  const logOut = ()=>{
    setLoading(true)
    return signOut(auth);
  }
  const updateUserProfile = (profile)=>{
    return updateProfile(auth.currentUser,profile);
  }

  const forgetPassword = (email)=>{
    setLoading(true)
    return sendPasswordResetEmail(auth,email)
  }

  //observer 
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false);
        // console.log(currentUser);
        
    });
    return ()=>{
        unsubscribe();
    }
  },[])




  const authInfo = {
    user,setUser,
    loading,setLoading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile, 
    forgetPassword,
  };


  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
