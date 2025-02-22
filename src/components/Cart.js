import React, { useContext } from "react";
import NavbarWithDropdown from "./Home/Navbar";
import Footer from "./Home/Footer";
import { AppContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { shoppingCart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (shoppingCart.length > 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <div>
      <NavbarWithDropdown />
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>
        {shoppingCart.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg p-5">
            <ul className="space-y-4">
              {shoppingCart.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl p-4"
                >
                  <div className="w-full sm:w-1/4 flex justify-center items-center">
                    <img
                      className="w-full max-w-[150px] h-auto object-contain"
                      src={item.imageURL}
                      alt={item.productName}
                    />
                  </div>
                  <div className="w-full sm:w-3/4 mt-4 sm:mt-0 sm:ml-4">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.productName}
                    </h5>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${item.productPrice}
                    </p>
                    <div className="mt-2">
                      <h2 className="text-lg font-semibold">Colors:</h2>
                      <ul className="list-disc list-inside">
                        {item.productColors.map((color, index) => (
                          <li key={index}>{color}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h2 className="text-lg font-semibold">Details:</h2>
                      <ul className="list-disc list-inside">
                        {item.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-5 text-center">
            <p className="text-xl">Your cart is empty!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
