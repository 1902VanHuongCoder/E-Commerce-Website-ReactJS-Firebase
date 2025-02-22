import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../contextHelpers";
import NavbarWithDropdown from "./Home/Navbar";
import { useToast } from "rc-toastr";
import { FaShoppingCart } from "react-icons/fa";

const SearchResult = () => {
  const { user } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();

  // Handle buy product action
  const handleBuyProduct = (id) => {
    if (user) {
      const product = state.products[0].filter((item) => item.id === id);
      navigate("/order", {
        state: product[0],
      });
    } else {
      toast("Hãy đăng nhập để đặt hàng!");
    }
  };

  return (
    <div className="font-roboto">
      <NavbarWithDropdown />
      <div className="container mx-auto min-h-screen mt-5 rounded-lg px-4">
        <h1 className="text-xl sm:text-3xl font-semibold text-left text-gray-900 dark:text-white">
          Kết quả tìm kiếm cho từ khóa "{state.queryContent}"
        </h1>
        {state.products.length > 0 ? (
          <div className="w-full mx-auto pt-5">
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-0 sm:gap-y-4 gap-x-0 sm:gap-x-4 justify-items-start relative">
              {state.products.map((item, i) => (
                <li
                  key={i}
                  className="relative p-2 pb-4 sm:pb-4 flex flex-col justify-between max-w-sm border border-gray-100 sm:border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <div className="relative group w-full flex justify-center items-center overflow-hidden">
                      <div
                        className={`absolute w-full h-full ${
                          i % 2 === 0
                            ? "-translate-x-[110%]"
                            : "-translate-y-[110%]"
                        } ${
                          i % 2 === 0
                            ? "group-hover:translate-x-0"
                            : "group-hover:translate-y-0"
                        } bg-[rgba(0,0,0,.5)] transition-transform duration-300 flex justify-center items-center`}
                      >
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                          onClick={() => handleBuyProduct(item.id)}
                        >
                          Xem chi tiết
                        </button>
                      </div>
                      <div className="w-full h-[200px] p-2">
                        <img
                          className="w-full h-full object-contain"
                          src={item.imageURL}
                          alt={item.productName}
                        />
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="mb-2 text-[1rem] sm:text-lg tracking-tight text-gray-900 dark:text-white">
                        {item.productName}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Giá: {item.productPrice} $ <br />
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-x-2">
                    <button className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white hover:opacity-50 focus:outline-none bg-[#091F5B] w-full rounded-lg">
                      <span className="hidden sm:block">Thêm vào giỏ hàng</span>
                      <span className="block sm:hidden">Thêm </span>
                      <FaShoppingCart className="w-3.5 h-3.5 ml-2" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="w-[90%] bg-white mx-auto h-[200px] border-dashed border-2 border-slate-400 flex justify-center items-center gap-1">
            <span className="text-xl">&#128580;</span>
            <p className="text-xl">
              No match result for "{state.queryContent}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
