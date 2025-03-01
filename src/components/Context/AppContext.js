import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { db } from "../../firebase_setup/firebase";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState();
  // const [shoppingCart, setShoppingCart] = useState([]);

  const logout = () => {
    setUser(null);
  };

  const updateUserData = (data) => {
    setUser(data);
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
    fetchData();
  }, []);

  console.log(user);

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
