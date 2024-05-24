import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
  const { auth } = useContext(AuthContext)

  useDebugValue(auth, auth => auth?.user ? "Logged in": "Logged out")

  return useContext(AuthContext)
}