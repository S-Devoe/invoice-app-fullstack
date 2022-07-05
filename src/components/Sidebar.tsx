import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";
import Logo from "../assets/AssetComponents/Logo";
import Avatar from "../assets/AssetComponents/Avatar";
import { auth } from "../firebase/config";
import Button from "./Button";
import useMyContext from "../hooks/useContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export interface themeMode {
  toggleTheme: () => void;
}

const Sidebar = ({ toggleTheme }: themeMode) => {
  const { setShowLogoutModal } = useMyContext();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setLoggedIn(true);
    });
  }, []);

  
  return (
    <SidebarContainer>
      {/* Logo  */}
      <div className="sidebar-logo">
        <Logo />
      </div>

      <div className="sidebar-button">
        {/* toggle theme  */}
        <ThemeToggle toggleTheme={toggleTheme} />

        {/* divider  */}
        <Divider />

        {/* profile image  */}
        {auth.currentUser !==  null && (
          <Button
            className="remove-bg"
            onClick={() => setShowLogoutModal(true)}
            icon={<Avatar />}
          />
        )}
      </div>
    </SidebarContainer>
  );
};
export default Sidebar;

const SidebarContainer = styled.aside`
  position: sticky;
  top: 0;
  z-index: 25;
  background: ${(props) => props.theme.color.sidebar.bg};
  transition: background 0.3s;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;

  .sidebar-button {
    margin-left: auto;
    display: flex;
    height: 100%;
  }
  .remove-bg {
    background: transparent;
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 6.4375rem;
    border-radius: 0 1rem 1rem 0;

    .sidebar-logo {
      margin-bottom: auto;
      flex: 1;
    }

    .sidebar-button {
      flex: 1;

      align-items: center;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 5rem;
  background: #494e6e;

  @media screen and (min-width: 1000px) {
    width: 6.4375rem;
    height: 1px;
  }
`;
