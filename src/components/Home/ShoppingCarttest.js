import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { AiFillBell } from "react-icons/ai";
import { useToast } from "rc-toastr";
import { AppContext } from "../Context/AppContext";

const ShoppingCart = ({ products, handleRemoveProductOutOfShoppingCart }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const handleBuyProduct = (id) => {
    if (!user) {
      toast("Log in please!");
      return;
    } else {
      const product = products.filter((item) => item.id === id);
      navigate("/order", { state: product[0] });
    }
  };
  return (
    <div className="bg-[#4b4949] py-6 px-4">
      <div className="flex justify-start items-center gap-2">
        {" "}
        <FaShoppingBag className="text-[#ee4d2d]" />{" "}
        <span className="text-white">|</span>
        <h1 className="text-white sm:block hidden"> Shopping Cart</h1>
        <button
          onClick={() => setShowShoppingCart(!showShoppingCart)}
          type="button"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:focus:ring-yellow-900"
        >
          {showShoppingCart ? "Hidden" : "Show"} Shopping Cart
        </button>
        {products.length > 0 && (
          <span className="text-white text-xl right-2 -top-1 animate-wiggle-more animate-infinite">
            <AiFillBell />
          </span>
        )}
      </div>
      {showShoppingCart &&
        (products.length > 0 ? (
          <div className="grid-cols-1 w-full rounded-lg sm:w-[95%] sm:mx-auto bg-slate-50 grid lg:grid-cols-4 sm:grid-cols-3 p-4 gap-3 justify-items-center mt-6">
            {products?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="w-[200px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="w-full flex justify-center items-center">
                    <div className="w-[100px] h-[100px] p-2">
                      <img
                        className="w-full h-full"
                        src={item.imageURL}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.productName}
                    </h5>

                    <div>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${item.productPrice}
                      </span>
                      <button
                        onClick={() => handleBuyProduct(item.id)}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center flex w-full justify-center items-center mr-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg
                          className="w-3.5 h-3.5 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 21"
                        >
                          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        Buy now
                      </button>
                      <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center w-full mr-2 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() =>
                          handleRemoveProductOutOfShoppingCart(item.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center h-12 border-2 border-white border-dashed w-[80%] mx-auto mt-6 text-white">
            <BsFillEmojiLaughingFill />
            <h1>You haven't bought anything!</h1>
          </div>
        ))}
    </div>
  );
};

export default ShoppingCart;
