import {
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/config";
import useMyContext from "./hooks/useContext";
import { AnimatePresence } from "framer-motion";
import ConfirmModal from "./components/ConfirmModal";
import OverLay from "./components/OverLay";
import {
  addInvoice,
  getInvoices,
  deleteInvoice as deleteInvoiceDocument,
  editInvoice as editInvoiceDocument,
} from "./firebase/invoiceCollections";
import { Invoice as InvoicesExtended, InvoiceStatus } from "./Types/invoice";
import useAuthContext from "./hooks/AuthContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showLogoutModal, setShowLogoutModal } = useMyContext();
  const { currentUser, dispatch } = useAuthContext();
  const [invoiceFormData, setInvoiceFormData] =
    useState<InvoicesExtended | null>(null);
  const [invoices, setInvoices] = useState<InvoicesExtended[]>([]);
  const [anonymousUser, setAnonymousUser] = useState<boolean | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      //currentUser here is from firebase not fom the context
      if (currentUser) {
        console.log(auth.currentUser);
        // console.log(invoices);
      } else {
        console.log(auth.currentUser);
      }
    });
  }, [invoices]);

  const RequireAuth = ({ children }: any) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    const getInvoiceFunction = async () => {
      if (currentUser) {
        if (auth?.currentUser?.email) {
          console.log(auth.currentUser.email);
          const storeInvoices = await getInvoices(auth.currentUser.email);
          if (storeInvoices) return setInvoices(storeInvoices);
        }
      }
    };
    getInvoiceFunction();
  }, [currentUser]);

  const logout = () => {
    signOut(auth);
    setShowLogoutModal(false);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const showInvoiceForm = (id?: string) => {
    if (!id) return setInvoiceFormData(null);

    const invoice = invoices?.find((invoice) => invoice.id === id);
    if (!invoice) throw Error("No invoice found");
    return setInvoiceFormData(invoice);
  };

  const newInvoice = async (data: InvoicesExtended) => {
    if (auth?.currentUser?.email) {
      await addInvoice({
        ...data,
        createdBy: auth.currentUser.email,
      });
      if (!auth?.currentUser?.email) throw Error("No user found");

      const invoices = await getInvoices(auth.currentUser.email);

      if (invoices) setInvoices(invoices);
    }
  };

  const editInvoice = async (data: InvoicesExtended) => {
    const invoiceToUpdate = invoices?.find((invoice) => invoice.id === data.id);
    if (!invoiceToUpdate) throw Error("No invoice to edit");

    if (currentUser) {
      if (!auth?.currentUser?.email) throw Error("No user found");
      const firestoreInvoices = await getInvoices(auth?.currentUser?.email);
      if (!invoices) throw Error("No invoices found");

      setInvoices(firestoreInvoices);
    }
  };

  const deleteInvoice = async (id: string) => {
    const newInvoiceArray = invoices?.filter((invoice) => invoice.id !== id);
    if (!newInvoiceArray) throw Error("No invoice to delete");

    setInvoices(newInvoiceArray);

    if (currentUser) {
      const invoiceToDelete = invoices?.find((invoice) => invoice.id === id);
      if (!invoiceToDelete)
        throw Error(
          "No invoice to corresponds to the invoice you are trying to delete"
        );

      if (!invoiceToDelete.documentId) throw Error("No document Id found");

      await deleteInvoiceDocument(invoiceToDelete.documentId);
    }
  };

  const markAsPaid = async (id: string) => {
    const invoiceToUpdate = invoices?.find((invoice) => invoice.id === id);

    if (!invoiceToUpdate) throw Error("No invoice to update");

    if (currentUser) {
      await editInvoiceDocument({
        ...invoiceToUpdate,
        status: "paid",
      });

      if (!auth?.currentUser?.email) throw Error("No user found");
      const firestoreInvoices = await getInvoices(auth?.currentUser?.email);
      if (!invoices) throw Error("No invoices found");

      setInvoices(firestoreInvoices);
    } else {
      const newArray = invoices?.map((invoice) =>
        invoice.id === id
          ? { ...invoiceToUpdate, status: "paid" as InvoiceStatus }
          : invoice
      );

      if (!newArray) throw Error("Trying to map a null state");

      setInvoices(newArray);
    }
  };

  return (
    <AppContainer>
      <AnimatePresence>
        {showLogoutModal && (
          <OverLay onClick={() => setShowLogoutModal(false)} center={true}>
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

      <div className="wrapper">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navigate to="/invoices" />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="reset-password"
            element={
              currentUser ? <Navigate to="/invoices" /> : <PasswordReset />
            }
          />

          <Route
            path="invoices"
            element={
              <RequireAuth>
                {
                  <Invoices
                    invoices={invoices}
                    invoiceFormData={invoiceFormData}
                  />
                }
              </RequireAuth>
            }
          />
          <Route path="invoices/:id" element={<Invoice />} />
          <Route
            path="*"
            element={
              <RequireAuth>
                <Navigate to="/invoices" />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.section`
  width: 100%;
  padding-top: 3rem;

  .wrapper {
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
