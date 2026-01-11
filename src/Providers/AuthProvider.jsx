import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import AuthContext from "./authContext";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
 
  const [user, setUser] = useState(null);

 
  const [authLoading, setAuthLoading] = useState(true);

 
  const [role, setRole] = useState("buyer");
  const [status, setStatus] = useState("active");
  const [suspendInfo, setSuspendInfo] = useState(null);

  const signIn = (email, password) => {
  
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const userSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setRole("buyer");
    setStatus("active");
    setSuspendInfo(null);
  };

  const userUpdateProfile = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  // ================= AUTH OBSERVER =================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole("buyer");
        setStatus("active");
        setSuspendInfo(null);
        setAuthLoading(false);
        return;
      }

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
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);



  const authInfo = {
    user,
    authLoading, 
    role,
    status,
    suspendInfo,

    signIn,
    createUser,
    googleLogin,
    userSignOut,
    userUpdateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}
