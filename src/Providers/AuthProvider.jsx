import React, { useEffect, useState } from 'react'
import {auth} from "../Firebase/Firebase.init.js"
import { createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged,
     signInWithEmailAndPassword, 
     signInWithPopup, 
     signOut, 
     updateProfile } from 'firebase/auth'
import AuthContext from './authContext';

const googleProviders=new GoogleAuthProvider(auth)

export default function AuthProvider({children}) {
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);

    const signIn=(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userSignOut=()=>{
        setLoading(true);
        return signOut(auth);
    }
    const userUpdateProfile=(name,photoUrl)=>{
        setLoading(true);
        const data={
            displayName:name,
            photoUrl:photoUrl
        }
        return updateProfile(auth.currentUser, data);
    }
      const googleLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProviders);
    }
    const userInfo={
        user,
        userSignOut,
        signIn,
        createUser,
        setLoading,
        loading,
       userUpdateProfile,
       googleLogin
    }
  
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>unsubscribe();
    },[])
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  )
}
