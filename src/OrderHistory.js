import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase_setup/firebase";
import { AppContext } from "./Context/AppContext";
import { Loading, Footer, NavBar } from "./helpers";
import orderBackgroundVector from "./assets/OrderBackground.png";
import { FaArrowLeftLong, FaBagShopping, FaBox } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

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
          <NavBar />
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
                        <ol className="items-center sm:flex sm:flex-wrap px-4 py-4 gap-4 gap-x-6 space-y-4 sm:space-y-0">
                          {order.deliveryState.map((state, i) => (
                            <li className="flex flex-col gap-y-2" key={i}>
                              <span className="flex items-center gap-x-2 w-full">
                                <span className="p-3 rounded-full bg-gray-300 flex justify-center items-center text-sm">
                                  {parseInt(state.stateCode) === 0 && (
                                    <FaBoxOpen />
                                  )}{" "}
                                  {parseInt(state.stateCode) === 1 && <FaBox />}{" "}
                                  {parseInt(state.stateCode) === 2 && (
                                    <MdLocalShipping />
                                  )}{" "}
                                  {parseInt(state.stateCode) === 3 && (
                                    <FaCheckCircle />
                                  )}{" "}
                                </span>
                                {parseInt(state.stateCode) !== 3 && (
                                  <span className="h-[2px] w-full bg-gray-200 rounded-md"></span>
                                )}
                              </span>
                              <span>{state.stateMessage}</span>
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
