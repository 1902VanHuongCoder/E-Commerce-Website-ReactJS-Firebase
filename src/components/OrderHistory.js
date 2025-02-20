import { useNavigate } from "react-router-dom";
import Footer from "./Home/Footer";
import { FcShipped } from "react-icons/fc";
import NavbarWithDropdown from "./Home/Navbar";
import { db } from "../firebase_setup/firebase";
import { useContext } from "react";
import { LoginContext } from "./Context/LoginContext";
import { AppContext } from "./Context/AppContext";
import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiFillShopping } from "react-icons/ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BsFillBox2Fill, BsFillEmojiLaughingFill } from "react-icons/bs";
import Loading from "./Loading";
import { FaArrowLeftLong } from "react-icons/fa6";

const OrderHistory = () => {
  const navigate = useNavigate("/");
  const { isLogin } = useContext(LoginContext);
  const { account } = useContext(AppContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve user's order history from database
  const getOrderedHistory = async () => {
    if (isLogin) {
      setLoading(true);
      const collection_ref = collection(db, "orders");
      const q = query(
        collection_ref,
        where("username", "==", account.username)
      );
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
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-red-500">
            <NavbarWithDropdown />
            <div className="w-full mx-auto rounded large px-4 sm:px-20">
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
              <div className="flex flex-col gap-4">
                {orderHistory.length > 0 ? (
                  orderHistory.map((order, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-md mb-4 p-6 pl-10 flex items-center gap-x-6 border-[1px] border-solid border-[rgba(0,0,0,.2)] shadow-md"
                    >
                      <div className="w-[300px] h-full basis bg-yellow-200">
                        <img
                          className="w-full h-auto object-fit"
                          src={order.imageURL}
                          alt={order.productName}
                        />
                      </div>
                      <div>
                        <div className="flex justify-start items-center">
                          <h2 className="font-normal py-2 px-5">
                            # Tên sản phẩm
                          </h2>
                          <p className="text-xl font-medium">
                            {order.productName}
                          </p>
                        </div>
                        <div className="flex justify-start items-center">
                          <h2 className="font-normal py-2 px-5 ">
                            # Số lượng sản phẩm
                          </h2>
                          <p className="font-medium">
                            {order.productAmount < 10
                              ? `0${order.productAmount}`
                              : order.productAmount}
                          </p>
                        </div>
                        <div className="flex justify-start items-center">
                          <h2 className="font-normal py-2 px-5">
                            # Màu sắc sản phẩm
                          </h2>
                          <p>
                            {order.productColors.map((color, index) => (
                              <span className="font-medium" key={index}>
                                {color}
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="flex justify-start items-center">
                          <h2 className="font-normal py-2 px-5">
                            # Địa chỉ khách hàng
                          </h2>
                          <p>{order.address}</p>
                        </div>
                        <div className="flex justify-start items-center">
                          <h2 className="font-normal py-2 px-5">
                            # Mã sản phẩm
                          </h2>
                          <p className="px-2 bg-slate-200 rounded-sm font-medium">
                            {order.productId}
                          </p>
                        </div>
                        <div>
                          <h2 className="font-normal py-2 px-5">
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
                        <div className="flex justify-start items-center mt-3">
                          <h2 className="font-senorfont-normal py-2 px-5 text-[#091F5B] text-2xl">
                            # Tổng tiền
                          </h2>
                          <p className="text-2xl">${order.totalAmount}</p>
                        </div>
                      </div>
                      {/* <h1 className="flex items-center gap-1 font-medium">
                        <span className="text-[#ee4d2d] text-xl">
                          <AiFillShopping />
                        </span>
                        <span>Order {i + 1}</span>
                      </h1>
                      <div className="flex justify-start items-center">
                        <h2 className="font-normal py-2 px-5">
                          # Product Name
                        </h2>
                        <p className="text-xl">{order.productName}</p>
                      </div>
                      <h2 className="font-normal py-2 px-5"># Product Image</h2>
                      <div className="w-full flex justify-center items-center">
                        <img
                          src={order.imageURL}
                          alt={order.productName}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="flex justify-start items-center">
                        <h2 className="font-normal py-2 px-5">
                          # Amount of products
                        </h2>
                        <p>{order.productAmount}</p>
                      </div>
                      <div className="flex justify-start items-center">
                        <h2 className="font-normal py-2 px-5">
                          # Product Color
                        </h2>
                        <p>
                          {order.productColors.map((color, index) => (
                            <span
                              className="px-2 bg-[#cb90f3] py-2 rounded-lg font-normal"
                              key={index}
                            >
                              {color}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="flex justify-start items-center">
                        <h2 className="font-normal py-2 px-5">
                          # Customer's address
                        </h2>
                        <p>{order.address}</p>
                      </div>
                      <div className="flex justify-start items-center">
                        <h2 className="font-normal py-2 px-5"># Product ID</h2>
                        <p className="px-2 bg-slate-200 rounded-sm">
                          {order.productId}
                        </p>
                      </div>

                      <h2 className="font-normal py-2 px-5"># Order State</h2>
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
                                Released on {state.date}
                              </time>
                            </div>
                          </li>
                        ))}
                      </ol>

                      <div className="flex justify-start items-center">
                        <h2 className="font-senorfont-normal py-2 px-5 text-[#ee4d2d] text-2xl">
                          # Total
                        </h2>
                        <p className="text-2xl">${order.totalAmount}</p>
                      </div> */}
                    </div>
                  ))
                ) : (
                  <div className="flex gap-2 justify-center items-center h-[40vh] border-2 border-[#7c7474] border-dashed w-[80%] mx-auto mt-3 text-[#ee4d2d] mb-5">
                    <BsFillEmojiLaughingFill />
                    <h1>You haven't bought anything!</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative min-h-screen">
            {/* <NavbarWithDropdown /> */}
            <div className="mt-6 w-10/12 bg-slate-100 mx-auto rounded large p-3 h-fit mb-7">
              <h1 className="py-4 px-10 font-medium text-[#ee4d2d] text-2xl">
                Order history
              </h1>
              {orderHistory.length > 0 ? (
                orderHistory.map((order, i) => (
                  <div key={i} className="bg-white rounded-lg mb-4 p-3">
                    <h1 className="flex items-center gap-1 font-medium">
                      <span className="text-[#ee4d2d] text-xl">
                        <AiFillShopping />
                      </span>
                      <span>Order {i + 1}</span>
                    </h1>
                    <div className="flex justify-start items-center">
                      <h2 className="font-normal py-2 px-5"># Product Name</h2>
                      <p className="text-xl">{order.productName}</p>
                    </div>
                    <h2 className="font-normal py-2 px-5"># Product Image</h2>
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={order.imageURL}
                        alt={order.productName}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="flex justify-start items-center">
                      <h2 className="font-normal py-2 px-5">
                        # Amount of products
                      </h2>
                      <p>{order.productAmount}</p>
                    </div>
                    <div className="flex justify-start items-center">
                      <h2 className="font-normal py-2 px-5"># Product Color</h2>
                      <p>
                        {order.productColors.map((color, index) => (
                          <span
                            className="px-2 bg-[#cb90f3] py-2 rounded-lg font-normal"
                            key={index}
                          >
                            {color}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="flex justify-start items-center">
                      <h2 className="font-normal py-2 px-5">
                        # Customer's address
                      </h2>
                      <p>{order.address}</p>
                    </div>
                    <div className="flex justify-start items-center">
                      <h2 className="font-normal py-2 px-5"># Product ID</h2>
                      <p className="px-2 bg-slate-200 rounded-sm">
                        {order.productId}
                      </p>
                    </div>

                    <h2 className="font-normal py-2 px-5"># Order State</h2>
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
                              Released on {state.date}
                            </time>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <div className="flex justify-start items-center">
                      <h2 className="font-senorfont-normal py-2 px-5 text-[#ee4d2d] text-2xl">
                        # Total
                      </h2>
                      <p className="text-2xl">${order.totalAmount}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 justify-center items-center h-[40vh] border-2 border-[#7c7474] border-dashed w-[80%] mx-auto mt-3 text-[#ee4d2d] mb-5">
                  <BsFillEmojiLaughingFill />
                  <h1>You haven't bought anything!</h1>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default OrderHistory;
