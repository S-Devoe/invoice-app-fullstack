import React, { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";

import AuthReducer from "./AuthReducer";
interface Props {
  currentUser: any;
  dispatch?: any;
}

const store: any = localStorage.getItem("user");

const initialState = {
  currentUser: JSON.parse(store) || null,
};

export const AuthContext = createContext<Props>(initialState);

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser: state.currentUser, dispatch: dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
