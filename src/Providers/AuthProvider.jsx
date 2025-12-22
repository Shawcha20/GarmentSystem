import React, { useEffect, useState } from 'react'
import {auth} from "../Firebase/Firebase.init.js"
import { createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged,
     signInWithEmailAndPassword, 
     signInWithPopup, 
     signInWithRedirect, 
     signOut, 
     updateProfile } from 'firebase/auth'
import AuthContext from './authContext';
import useAxiosSecure from '../hooks/useAxiosSecure.jsx';
import axios from 'axios';

const googleProviders=new GoogleAuthProvider(auth)

export default function AuthProvider({children}) {
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);
    const [role, setRole] = useState("buyer");   
    const [suspendInfo, setSuspendInfo] = useState(null);
    const [status, setStatus] = useState("pending"); 
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
       googleLogin,
       role,
       status,
       suspendInfo
    }

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const token = await currentUser.getIdToken();

          const res = await axios.get(
            `http://localhost:3000/users/role/${currentUser.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRole(res.data.role || "buyer");
          setStatus(res.data.status || "pending");
          setSuspendInfo(res.data.suspendInfo || null);
        } catch (error) {
          console.error("Role fetch failed", error);
          setRole("buyer");
          setStatus("pending");

        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  )
}
