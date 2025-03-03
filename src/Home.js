import React, { useState, useContext } from "react";

import { Feeback, Banner, Footer, Products, Loading, NavBar } from "./helpers";

import { AppContext } from "./contextHelpers";

import { useToast } from "rc-toastr";

const Home = () => {
  console.log(
    "<--------------------------- Home Run --------------------------->"
  );

  const { data } = useContext(AppContext);
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

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <div className="relative max-w-screen mx-auto">
          <NavBar />
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
