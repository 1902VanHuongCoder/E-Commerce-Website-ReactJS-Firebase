import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import Loading from "../Loading";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import UpdateProduct from "./UpdateProduct";
import { FiPlusCircle } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

const Product = ({ changeActiveTab }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProduct, setEditProduct] = useState({
    show: false,
    productData: {},
  });
  const [deleteProduct, setDeleteProduct] = useState({
    show: false,
    productId: null,
  });

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getDocs(collection(db, "products"));
      const productsData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteProduct = async () => {
    if (deleteProduct.productId) {
      await deleteDoc(doc(db, "products", deleteProduct.productId));
      setProducts(
        products.filter((product) => product.id !== deleteProduct.productId)
      );
      setDeleteProduct({ show: false, productId: null });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative w-full h-full max-w-screen overflow-hidden">
      <div className="flex justify-between items-center font-medium w-full text-xl py-5 px-5 uppercase border-b-[1px] border-b-solid border-b-[rgba(0,0,0,.2)]">
        <h2>Danh sách sản phẩm</h2>
        <button
          onClick={changeActiveTab}
          className="fixed bottom-10 sm:bottom-0 right-5 sm:right-0 sm:relative z-10 flex text-2xl sm:text-sm items-center gap-x-2 bg-[#081F5C] text-white px-4 py-4 sm:py-2 rounded-full sm:rounded-md"
        >
          <span className="hidden sm:block">THÊM SẢN PHẨM </span>
          <span className="hidden sm:block">
            <FiPlusCircle />
          </span>
          <span className="sm:hidden">
            <FaPlus />
          </span>
        </button>
      </div>
      {editProduct.show && (
        <UpdateProduct
          productData={editProduct.productData}
          handleCloseUpdateModal={() =>
            setEditProduct({ ...editProduct, show: false })
          }
        />
      )}
      {deleteProduct.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 sm:p-6 w-[90%] sm:w-auto rounded-md shadow-md">
            <h3 className="text-lg font-medium mb-4">Xác nhận xóa sản phẩm</h3>
            <p className="mb-4">
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </p>
            <div className="flex justify-end gap-x-4">
              <button
                onClick={() =>
                  setDeleteProduct({ show: false, productId: null })
                }
                className="px-4 py-2 border-[2px] border-solid border-[#081F5C] rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-[#081F5C] text-white py-2 px-4 rounded-md"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between sm:items-center mt-4 px-4 flex-col sm:flex-row gap-y-4 ">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md sm:w-[50%]"
        />
        <div className="flex justify-start">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="w-screen overflow-scroll sm:overflow-auto sm:w-full">
        <div className="relative p-4 w-[1024px] sm:w-full">
          <div className="flex text-xs text-white font-extrabold uppercase bg-[#081F5C] dark:bg-gray-700 dark:text-gray-400">
            <div className="px-3 py-3 w-[5%] text-center">STT</div>
            <div className="px-3 py-3 w-[25%]">Tên sản phẩm</div>
            <div className="px-3 py-3 w-[40%] ml-2">Màu sắc</div>
            <div className="px-3 py-3 w-[10%]">Danh mục</div>
            <div className="px-3 py-3 w-[10%]">Giá</div>
            <div className="px-3 py-3 w-[10%] text-center">Hành động</div>
          </div>
          {currentItems.map((product, i) => (
            <div
              className="flex items-center border-b dark:bg-gray-900 dark:border-gray-700 text-sm"
              key={i}
            >
              <div className="px-3 py-3 w-[5%] text-center">
                {indexOfFirstItem + i + 1}
              </div>
              <div
                className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[25%] overflow-hidden text-ellipsis"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.productName}
              </div>
              <div className="px-3 py-3 w-[40%] flex flex-wrap">
                {product.productColors.map((color, index) => (
                  <p className="ml-2" key={index}>
                    {index === product.productColors.length - 1
                      ? color
                      : `${color},`}
                  </p>
                ))}
              </div>
              <div className="px-3 py-3 w-[10%] ml-2">
                {product.productType}
              </div>
              <div className="px-3 py-3 w-[10%]">${product.productPrice}</div>
              <div className="flex gap-x-2 justify-center items-center px-3 py-3 w-[10%]">
                <button
                  className="px-4 py-2 rounded"
                  onClick={() =>
                    setEditProduct({ show: true, productData: product })
                  }
                >
                  <FaPencil />
                </button>
                <button
                  className="px-4 py-2 rounded"
                  onClick={() =>
                    setDeleteProduct({ show: true, productId: product.id })
                  }
                >
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
