import React, { createContext, useContext, useEffect, useState } from "react";
import {
  setSessionCookie,
  getSessionCookie,
  destroySessionCookie,
} from "./sessions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseClient";
import {
  logInWithEmail,
  signInWithGoogle,
  signOutAuth,
  signUpWithEmail,
  signInWithEmailPasswordless,
  completeSignIn,
} from "@/backend/firebase/auth/auth_func";

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sessionData = getSessionCookie();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      destroySessionCookie();

      if (user) {
        setSessionCookie({
          email: user.email,
          uid: user.uid,
        });
      } else {
        destroySessionCookie();
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  async function logOut() {
    destroySessionCookie();
    await signOutAuth(); 
  }

  return (
    <AuthContext.Provider
      value={{
        sessionData,
        signUpWithEmail,
        logInWithEmail,
        logOut,
        signInWithGoogle,
        signInWithEmailPasswordless,
        completeSignIn,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
