import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { sessionData } = useAuth();

  useEffect(() => {
    if (!sessionData.uid) {
      router.push("/");
    }
  }, [router, sessionData.uid]);
  return <div>{sessionData ? children : null}</div>;
  //return <div>{children}</div>;
};

export default ProtectedRoute;
