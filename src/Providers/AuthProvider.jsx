import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init.js";
import AuthContext from "./authContext";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔑 IMPORTANT: loading should default to FALSE
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("buyer");
  const [status, setStatus] = useState("active");
  const [suspendInfo, setSuspendInfo] = useState(null);

  /* =======================
      AUTH ACTIONS
  ======================= */

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userSignOut = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setRole("buyer");
    setStatus("active");
    setSuspendInfo(null);
    setLoading(false);
  };

  const userUpdateProfile = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  /* =======================
      AUTH STATE LISTENER
  ======================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // 🚀 PUBLIC USERS → DO NOT BLOCK
      if (!currentUser) {
        setUser(null);
        setRole("buyer");
        setStatus("active");
        setSuspendInfo(null);
        setLoading(false);
        return;
      }

      // 🔐 AUTHENTICATED USER
      setUser(currentUser);

      try {
        const token = await currentUser.getIdToken();

        const res = await axios.get(
          `https://garment-system-theta.vercel.app/users/role/${currentUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRole(res.data?.role || "buyer");
        setStatus(res.data?.status || "active");
        setSuspendInfo(res.data?.suspendInfo || null);
      } catch (error) {
        console.error("Failed to fetch role/status", error);
        setRole("buyer");
        setStatus("active");
        setSuspendInfo(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* =======================
      CONTEXT VALUE
  ======================= */

  const authInfo = {
    user,
    loading,
    role,
    status,
    suspendInfo,

    signIn,
    createUser,
    googleLogin,
    userSignOut,
    userUpdateProfile,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}
