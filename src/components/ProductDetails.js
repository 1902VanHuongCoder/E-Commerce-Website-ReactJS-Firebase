import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase_setup/firebase"; // Import your Firebase setup
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { AppContext } from "../contextHelpers";
import { NavbarWithDropdown } from "../helpers";
import { useToast } from "rc-toastr";
import { FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const ProductDetails = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { productId } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        setError("Tải thông tin sản phẩm thất bại");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setError("Thông tin về sản phẩm không đang được cập nhật");
      setLoading(false);
    }
  }, [productId]);

  // Handle buy product action
  const handleBuyProduct = () => {
    if (user) {
      navigate(`/dathang/${productId}`, { state: product });
    } else {
      toast("Hãy đăng nhập để mua hàng!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="relative font-roboto">
      <NavbarWithDropdown />
      <div className="w-full px-4 sm:mb-[70px] mb-[140px] sm:px-10 min-h-screen mx-auto grid grid-cols-1 gap-y-5 lg:grid-cols-4 pt-1 sm:pt-10">
        <div className="w-full border-r-[1px] border-r-solid border-gray-100 pr-4">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-[80%] sm:w-[60%] lg:w-full"
              src={product?.imageURL}
              alt="Ảnh sản phẩm"
            />
          </div>
        </div>
        <div className="col-span-3 px-2 sm:px-5">
          <h1 className="text-[20px] sm:text-[28px] text-[#6d6d6d]">
            {product?.productName}
          </h1>
          <div className="flex flex-wrap gap-x-3 pb-3">
            <div className="flex items-center">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              <svg
                className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                4.95/5
              </p>
            </div>
            <span className="text-[#0069ff]">26,028 xếp hạng </span>
            <span className="text-[#6d6d6d]"> |</span>
            <span className="text-[#0069ff]"> 33 câu hỏi được trả lời </span>
          </div>
          <hr />
          <div className="text-[20px] sm:text-[24px] py-4 text-[#091F5B] font-bold">
            <sup>$</sup>
            {product?.productPrice}
          </div>
          <div>
            <p className="font-bold">Các phiên bản màu</p>
            <div className="my-3 flex flex-wrap gap-2">
              {product?.productColors.map((color, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-sm rounded-sm border border-solid border-[rgba(0,0,0,.8)]"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[25px]">
            <p className="font-bold">Chi tiết sản phẩm</p>
            <div className="px-4 pt-2 relative text-sm text-justify duration-100 transition-all">
              {product?.details.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex flex-col sm:flex-row justify-between px-4 py-2 sm:py-0 sm:px-10 gap-y-2 sm:gap-x-5 items-center w-full h-auto sm:h-[70px] border-t-[1px] border-t-solid border-gray-100 bg-white drop-shadow-2xl">
        <Link
          to="/"
          className="hidden sm:flex items-center gap-x-2 text-[#091F5B] text-xl"
        >
          <span>
            <FaArrowLeftLong />
          </span>
          <span>Quay lại</span>
        </Link>
        <div className="flex flex-col sm:flex-row justify-end gap-y-2 sm:gap-x-5 w-full sm:w-fit">
          <button className="flex items-center justify-center gap-x-2 border-[2px] border-solid border-[#091F5B] text-[#091F5B] py-3 px-6 rounded-md w-full sm:w-auto hover:bg-[#091F5B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#091F5B]">
            <span>
              <FaShoppingCart />
            </span>
            <span>THÊM VÀO GIỎ HÀNG</span>
          </button>
          <button
            onClick={handleBuyProduct}
            className="flex items-center justify-center gap-x-2 bg-[#091F5B] text-white py-3 px-6 rounded-md w-full sm:w-auto hover:bg-[#081F5C] focus:outline-none focus:ring-2 focus:ring-[#091F5B] hover:opacity-50"
          >
            <span>
              <FaMoneyBillAlt />
            </span>
            <span>MUA NGAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
