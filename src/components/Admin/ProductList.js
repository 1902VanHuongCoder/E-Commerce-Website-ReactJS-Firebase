import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import Loading from "../Loading";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <h2 className="font-medium w-full text-xl py-5 px-5 uppercase border-b-[1px] border-b-solid border-b-[rgba(0,0,0,.2)]">
        Danh sách sản phẩm
      </h2>
      <div className="relative p-4">
        <div className="flex text-xs text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <div className="px-6 py-3 w-[5%]">STT</div>
          <div className="px-6 py-3 w-[35%]">Tên sản phẩm</div>
          <div className="px-6 py-3 w-[20%]">Màu sắc</div>
          <div className="px-6 py-3 w-[10%]">Danh mục</div>
          <div className="px-6 py-3 w-[10%]">Giá</div>
          <div className="px-6 py-3 w-[20%]">Hành động</div>
        </div>
        {currentItems.map((product, i) => (
          <div
            className="flex bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            key={i}
          >
            <div className="px-6 py-4 w-[5%]">{indexOfFirstItem + i + 1}</div>
            <div
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[35%] overflow-hidden text-ellipsis"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.productName}
            </div>
            <div className="px-6 py-4 w-[20%] flex">
              {product.productColors.map((color, index) => (
                <p key={index}>{color}</p>
              ))}
            </div>
            <div className="px-6 py-4 w-[10%]">{product.productType}</div>
            <div className="px-6 py-4 w-[10%]">${product.productPrice}</div>
            <div className="px-6 py-4 w-[20%]">
              <button className=" px-4 py-2 rounded">
                <FaPencil />
              </button>
              <button className=" px-4 py-2 rounded">
                <MdOutlineDeleteOutline />
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 ${
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
    </div>
  );
};

export default ProductList;
