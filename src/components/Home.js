import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Feeback,
  Banner,
  Footer,
  Products,
  NavbarWithDropdown,
  Loading,
} from "../helpers";
import { AppContext } from "../contextHelpers";

import { useToast } from "rc-toastr";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, data } = useContext(AppContext);

  const navigate = useNavigate();
  // Toast notification hook
  const { toast } = useToast();

  // Local state for product data, shopping cart data, and loading state
  const [shoppingCartData, setShoppingCartData] = useState([]);

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

  // Check if the user is logged in and set the account state accordinglyss
  useEffect(() => {
    if (!user) {
      navigate("/dangnhap");
    }
  }, [user, navigate]);

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <div className="relative max-w-screen mx-auto">
          <NavbarWithDropdown />
          <Banner />
          <Products handleAddProduct={handleAddProduct} />
          <Feeback />
          <Footer />
        </div>
      )}
    </>
  );
};
export default Home;
