import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppContext } from "./Context/AppContext";
import { db } from "../firebase_setup/firebase";
import NavbarWithDropdown from "./Home/Navbar";
import Footer from "./Home/Footer";
import Loading from "./Loading";
import { FaArrowLeftLong, FaBagShopping } from "react-icons/fa6";
import { FcShipped } from "react-icons/fc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillBox2Fill } from "react-icons/bs";
import orderBackgroundVector from "../assets/OrderBackground.png";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve user's order history from database
  const getOrderedHistory = async () => {
    if (user) {
      setLoading(true);
      const collection_ref = collection(db, "orders");
      const q = query(collection_ref, where("username", "==", user.username));
      const doc_ref = await getDocs(q);

      const res = [];
      doc_ref.forEach((order) => {
        res.push({
          ...order.data(),
        });
      });

      setOrderHistory(res);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderedHistory();
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full min-h-full font-roboto">
          <NavbarWithDropdown />
          <div className="relative w-full mx-auto rounded large px-4 sm:px-20">
            <div className="absolute top-0 left-0 blur-lg w-full h-full -z-2"></div>
            <button
              onClick={() => navigate(-1)}
              className="hidden sm:flex items-center gap-x-2 text-md fixed top-[50%] left-8 rounded-full border-[2px] border-solid border-black p-2 bg-white z-50 hover:bg-[#091F5B] hover:text-white"
            >
              <span>
                <FaArrowLeftLong />
              </span>
            </button>
            <h1 className="py-4 px-4 sm:px-10 text-center font-medium text-[#091F5B] text-2xl">
              LỊCH SỬ MUA HÀNG
            </h1>
            <div className="relative flex flex-col gap-4 min-h-[80vh]">
              {orderHistory.length > 0 ? (
                orderHistory.map((order, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-md mb-4 p-2 sm:p-6 sm:pl-10 flex flex-col sm:flex-row items-center gap-x-6 border-[1px] border-solid border-[rgba(0,0,0,.1)]"
                  >
                    <div className="absolute top-0 left-0 w-full h-full -z-10">
                      <img
                        className="w-full h-full object-cover"
                        src={orderBackgroundVector}
                        alt="order background vector"
                      />
                    </div>
                    <div className="absolute right-6 top-6 text-2xl py-2 px-3 rounded-full bg-[#091F5B] text-white sm:bg-white sm:text-[#091F5B] z-10">
                      {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </div>
                    <div className="w-[150px] sm:w-[300px] h-full py-4 sm:py-0 flex justify-center items-center">
                      <img
                        className="w-full max-h-[300px] object-contain"
                        src={order.imageURL}
                        alt={order.productName}
                      />
                    </div>
                    <div className="sm:max-w-[60%] flex flex-col gap-[10px]">
                      <div className="flex flex-col sm:flex-row justify-start items-start sm:items-start">
                        <p className="text-xl font-medium px-2 sm:px-5">
                          {order.productName}
                        </p>
                      </div>
                      <div className="flex justify-start items-center">
                        <h2 className="font-normal py-2 px-2 sm:px-5">
                          # Số lượng
                        </h2>
                        <p className="font-medium">
                          {order.productAmount < 10
                            ? `0${order.productAmount}`
                            : order.productAmount}
                        </p>
                      </div>
                      <div className="flex justify-start items-center">
                        <h2 className="font-normal py-2 px-2 sm:px-5">
                          # Màu sắc
                        </h2>
                        <p>
                          {order.productColors.map((color, index) => (
                            <span className="font-medium" key={index}>
                              {color}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="flex justify-start items-start sm:items-center flex-col sm:flex-row">
                        <h2 className="font-normal py-2 px-2 sm:px-5">
                          # Địa chỉ
                        </h2>
                        <p className="font-medium px-3 sm:px-0">
                          {order.address}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center">
                        <h2 className="font-normal py-2 px-2 sm:px-5">
                          # Mã sản phẩm
                        </h2>
                        <p className="mx-2 bg-slate-200 rounded-sm font-medium px-2 sm:px-0">
                          {order.productId}
                        </p>
                      </div>
                      <div>
                        <h2 className="font-normal py-2 px-2 sm:px-5">
                          # Trạng thái đơn hàng
                        </h2>
                        <ol className="items-center sm:flex sm:flex-wrap px-4 gap-y-4">
                          {order.deliveryState.map((state, i) => (
                            <li className="relative mb-6 sm:mb-0" key={i}>
                              <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                  {i === 0 && <BsFillBox2Fill />}
                                  {i > 0 && state.state !== "Delivered" && (
                                    <FcShipped />
                                  )}
                                  {state.state === "Delivered" && (
                                    <AiOutlineCheckCircle className="text-green-400" />
                                  )}
                                </div>
                                {i + 1 !== order.deliveryState.length && (
                                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                )}
                              </div>
                              <div className="mt-3 sm:pr-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {state.state}
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                  Được cập nhật vào {state.date}
                                </time>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="flex justify-start items-center mt-0 sm:mt-3">
                        <h2 className="font-senorfont-normal py-2 px-2 sm:px-5 text-[#091F5B] text-2xl">
                          # Tổng tiền
                        </h2>
                        <p className="text-2xl">${order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col gap-2 justify-center items-center h-[80vh] border-2 border-[#7c7474] border-dashed w-full mx-auto mt-3 mb-5 text-xl">
                  <FaBagShopping className="text-4xl" />
                  <h1>Chưa có lịch sử mua hàng</h1>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default OrderHistory;
