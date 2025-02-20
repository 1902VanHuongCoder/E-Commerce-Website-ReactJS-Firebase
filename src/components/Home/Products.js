import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTshirt,
  FaUserAlt,
  FaThLarge,
  FaTags,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

const Products = ({ data, handleAddProduct }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [lovedProducts, setLovedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleRedirectProductDetailsPage = (id) => {
    const product = data.filter((product) => product.id === id);
    navigate(`/chitietsanpham/${id}`, {
      state: product,
    });
  };

  const handleToggleLovedProduct = (id) => {
    setLovedProducts((prevLovedProducts) =>
      prevLovedProducts.includes(id)
        ? prevLovedProducts.filter((productId) => productId !== id)
        : [...prevLovedProducts, id]
    );
  };

  const filteredData = data.filter((product) => {
    if (filter === "all") return true;
    if (filter === "loved") return lovedProducts.includes(product.id);
    return product.productType === filter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderPaginationButtons = () => {
    const maxButtons = 5; // Maximum number of pagination buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex flex-col sm:flex-row font-roboto">
      <div className="w-full sm:w-1/5 p-4 sm:p-6 sm:pt-10 border-b sm:border-b-0 sm:border-r-[1px] border-r-gray-300 border-r-solid">
        <h2 className="text-lg font-bold mb-4">Bộ lọc</h2>

        <div className="flex flex-col">
          <button
            className={`px-4 py-2 mb-2 flex items-center ${
              filter === "all"
                ? "border-b-[2px] border-b-solid border-b-[#364EB0] text-[#081F5C] text-lg"
                : ""
            }`}
            onClick={() => setFilter("all")}
          >
            <FaThLarge className="mr-2" />
            Tất cả sản phẩm
          </button>
          <button
            className={`px-4 py-2 mb-2 flex items-center ${
              filter === "shirt"
                ? "border-b-[2px] border-b-solid border-b-[#364EB0] text-[#081F5C] text-lg"
                : ""
            }`}
            onClick={() => setFilter("shirt")}
          >
            <FaTshirt className="mr-2" />
            Áo
          </button>
          <button
            className={`px-4 py-2 mb-2 flex items-center ${
              filter === "pant"
                ? "border-b-[2px] border-b-solid border-b-[#364EB0] text-[#081F5C] text-lg"
                : ""
            }`}
            onClick={() => setFilter("pant")}
          >
            <FaUserAlt className="mr-2" />
            Quần
          </button>
          <button
            className={`px-4 py-2 mb-2 flex items-center ${
              filter === "other"
                ? "border-b-[2px] border-b-solid border-b-[#364EB0] text-[#081F5C] text-lg"
                : ""
            }`}
            onClick={() => setFilter("other")}
          >
            <FaTags className="mr-2" />
            Sản phẩm khác
          </button>
          <button
            className={`px-4 py-2 mb-2 flex items-center ${
              filter === "loved"
                ? "border-b-[2px] border-b-solid border-b-[#364EB0] text-[#081F5C] text-lg"
                : ""
            }`}
            onClick={() => setFilter("loved")}
          >
            <FaHeart className="mr-2" />
            Yêu thích
          </button>
        </div>
      </div>
      <div className="w-full sm:w-4/5">
        <h1 className="text-[1.5rem] mx-auto px-6 pt-8 pb-6 text-left uppercase text-[#091F5B] font-bold sm:text-[2rem]">
          DANH SÁCH SẢN PHẨM
        </h1>
        <div className="w-full sm:w-[95%] h-fit mx-auto pt-2">
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-0 sm:gap-y-4 gap-x-0 sm:gap-x-4 justify-items-start relative">
              {currentItems.map((data, i) => (
                <div
                  className="relative p-2 pb-4 sm:pb-4 flex flex-col justify-between max-w-sm border border-gray-100 sm:border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                  key={i}
                >
                  <div>
                    <div className="relative group w-full flex justify-center items-center overflow-hidden">
                      <div
                        className={`absolute w-full h-full ${
                          i % 2 === 0
                            ? "-translate-x-full"
                            : "-translate-y-full"
                        }
                    ${
                      i % 2 === 0
                        ? "group-hover:translate-x-0"
                        : "group-hover:translate-y-0"
                    } bg-[rgba(0,0,0,.5)] transition-transform duration-300 flex justify-center items-center`}
                      >
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                          onClick={() =>
                            handleRedirectProductDetailsPage(data.id)
                          }
                        >
                          Xem chi tiết
                        </button>
                      </div>
                      <div className="w-full h-[200px] p-2">
                        <img
                          className="w-full h-full object-contain"
                          src={data.imageURL}
                          alt=""
                        />
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="mb-2 text-[1rem] sm:text-lg tracking-tight text-gray-900 dark:text-white">
                        {data.productName}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Giá: {data.productPrice} $ <br />
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-x-2">
                    <button
                      onClick={() => handleAddProduct(data.id)}
                      className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white hover:opacity-50 focus:outline-none bg-[#091F5B] w-full rounded-lg"
                    >
                      <span className="hidden sm:block">Thêm vào giỏ hàng</span>
                      <span className="block sm:hidden">Thêm </span>
                      <FaShoppingCart className="w-3.5 h-3.5 ml-2" />
                    </button>
                    <div
                      className={`flex items-center justify-center border-[1px] border-solid p-2 rounded-md ${
                        lovedProducts.includes(data.id)
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <FaHeart
                        className={`w-5 h-5 cursor-pointer ${
                          lovedProducts.includes(data.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleToggleLovedProduct(data.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-center text-xl">Sản phẩm đang được cập nhật</h1>
          )}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Trước
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
