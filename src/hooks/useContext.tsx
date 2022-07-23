import { createContext, useContext, useState } from "react";

interface Props {
  showLogoutModal: boolean;
  setShowLogoutModal?: any;
  showForm: boolean;
  setShowForm?: any;
  loggedIn?: boolean;
  setLoggedIn?: any;
}

const initialState = {
  showLogoutModal: false,
  showForm: false,
  loggedIn: false,
};

const Context = createContext<Props>(initialState);

export const ContextProvider = ({ children }: any) => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        showLogoutModal,
        setShowLogoutModal,
        showForm,
        setShowForm,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default function useMyContext() {
  return useContext(Context);
}
