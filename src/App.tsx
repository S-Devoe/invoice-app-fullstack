import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Invoice from "./pages/Invoice";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import Signup from "./pages/Signup";
import "./firebase/config";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/config";
import useMyContext from "./hooks/useContext";
import { AnimatePresence } from "framer-motion";
import ConfirmModal from "./components/ConfirmModal";
import OverLay from "./components/OverLay";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
        console.log(auth.currentUser);
      } else {
        setLoggedIn(false);
        console.log(auth.currentUser);
      }
    });
  }, []);

  const { showLogoutModal, setShowLogoutModal } = useMyContext();

  const logout = () => {
    signOut(auth);
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <AppContainer>
      <AnimatePresence>
        {showLogoutModal && (
          <OverLay onClick={() => setShowLogoutModal(false)}>
            <ConfirmModal
              title="Logout"
              text="are you sure you want to logout?"
              cancelText="cancel"
              confirmText="logout"
              confirm={() => logout()}
              cancel={() => setShowLogoutModal(false)}
            />
          </OverLay>
        )}
      </AnimatePresence>
      {loggedIn !== null && (
        <div className="wrapper">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={!loggedIn ? <Login /> : <Navigate to="/invoices" />}
            />
            <Route
              path="login"
              element={auth.currentUser !== null ? <Invoices /> : <Login />}
            />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<PasswordReset />} />

            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/:id" element={<Invoice />} />
          </Routes>
        </div>
      )}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.section`
  width: 100%;
  padding-top: 3rem;

  .wrapper {
    width: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media screen and (min-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-right: 4rem;
    padding-left: 4rem;

    .wrapper {
      width: 100%;
      max-width: 40rem;
    }
  }
`;
