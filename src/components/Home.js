import React, { useEffect, useState, useContext } from "react";
import {
  Feeback,
  Banner,
  Footer,
  Products,
  NavbarWithDropdown,
  ShoppingCart,
  Loading,
} from "../helpers";
import { AppContext, LoginContext } from "../contextHelpers";

import { db } from "../firebase_setup/firebase";
import { collection, getDocs } from "firebase/firestore";

import { useToast } from "rc-toastr";

const Home = () => {
  // Contexts for managing global state
  const { setAccount } = useContext(AppContext);
  const { isLogin, func } = useContext(LoginContext);

  // Toast notification hook
  const { toast } = useToast();

  // Local state for product data, shopping cart data, and loading state
  const [data, setData] = useState();
  const [shoppingCartData, setShoppingCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch product data from Firestore
  const fetchData = async () => {
    setLoading(true);
    await getDocs(collection(db, "products")).then((response) => {
      const dataResponsed = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(dataResponsed);
    });
    setLoading(false);
  };

  // Fetch product data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle adding a product to the shopping cart
  const handleAddProduct = (id) => {
    const haveProduct = shoppingCartData.find((item) => item.id === id);
    if (!haveProduct) {
      const product = data.filter((item) => item.id === id);
      setShoppingCartData([...shoppingCartData, product[0]]);
      toast("Bạn vừa thêm sản phẩm này vào giỏ hàng");
    } else {
      toast("Sản phẩm này đã có trong giỏ hàng!");
    }
  };

  // Function to handle removing a product from the shopping cart
  const handleRemoveProductOutOfShoppingCart = (id) => {
    const filterdData = shoppingCartData.filter((product) => product.id !== id);
    setShoppingCartData(filterdData);
  };

  // Check if the user is logged in and set the account state accordingly
  useEffect(() => {
    if (!isLogin) {
      const loggedInAccount = JSON.parse(
        localStorage.getItem("loggedInAccount")
      );
      if (loggedInAccount) {
        func(true);
        setAccount(loggedInAccount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative max-w-screen mx-auto">
          <NavbarWithDropdown />
          <Banner data={data} />
          {/* <ShoppingCart
            products={shoppingCartData}
            handleRemoveProductOutOfShoppingCart={
              handleRemoveProductOutOfShoppingCart
            }
          /> */}
          <Products data={data} handleAddProduct={handleAddProduct} />
          <Feeback />
          <Footer />
        </div>
      )}
    </>
  );
};
export default Home;
