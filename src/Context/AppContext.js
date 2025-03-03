import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { db } from "../firebase_setup/firebase";
import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore functions
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState();

  const logout = () => {
    setUser(null);
  };

  const updateUserData = (data) => {
    setUser(data);
  };

  const fetchUserData = async () => {
    const collection_ref = collection(db, "users_account");

    const userData = localStorage.getItem("loggedInAccount");

    if (!userData) {
      navigate("/dangnhap");
    } else {
      const q = query(
        collection_ref,
        where("username", "==", JSON.parse(userData).email)
      );
      const doc_refs = await getDocs(q);
      const res = [];
      doc_refs.forEach((account) => {
        res.push({
          id: account.id,
          ...account.data(),
        });
      });
      setUser(res[0]);
    }
  };

  const fetchData = async () => {
    await getDocs(collection(db, "products")).then((response) => {
      const dataResponsed = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(dataResponsed);
    });
  };

  useEffect(() => {
    fetchUserData();
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        logout,
        updateUserData,
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
