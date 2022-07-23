import {
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  deleteDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { Invoice } from "../Types/invoice";

import { db } from "./config";

export const getInvoices = async (email: string | null) => {
  // call the invoice collection from the online firebase
  const invoicesCollection = collection(db, "invoices");

  // snapshot gets the copy and store it on the app
  const invoiceSnapshot = await getDocs(
    query(
      invoicesCollection,
      orderBy("timestamp", "desc"),
      where("createdBy", "==", email)
    )
  );

  const invoicesList = invoiceSnapshot.docs.map((doc) => ({
    // spread all the data from firebase (as Invoice is to make sure everything is the same as the Types )
    ...(doc.data() as Invoice),

    // this is to make the document Id(on Firebase) the Id I will be using here
    documentId: doc.id,

    // get the timestamp from firebase and use it here
    timestamp: doc.data().timestamp.toDate(),
  }));

  return invoicesList;
};

export const addInvoice = async (data: Invoice) => {
  const invoicesCollection = collection(db, "invoices");

  await addDoc(invoicesCollection, data);
};

export const editInvoice = async (data: any) => {
  const invoiceRef = doc(db, "invoices", data.documentId);
  await updateDoc(invoiceRef, data);
};

export const deleteInvoice = async (documentId: string) => {
  await deleteDoc(doc(db, "invoices", documentId));
};
