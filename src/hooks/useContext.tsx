import { createContext, useContext, useState } from "react";

interface Props {
  showLogoutModal: boolean;
  setShowLogoutModal?: any;
}

const initialState = {
  showLogoutModal: false,
};

const Context = createContext<Props>(initialState);

export const ContextProvider = ({ children }: any) => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        showLogoutModal,
        setShowLogoutModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default function useMyContext() {
  return useContext(Context);
}
