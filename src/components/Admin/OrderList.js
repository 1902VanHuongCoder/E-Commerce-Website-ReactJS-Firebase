import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import Loading from "../Loading";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteOrder, setDeleteOrder] = useState({
    show: false,
    orderId: null,
  });
  const [updateOrder, setUpdateOrder] = useState({
    show: false,
    orderData: null,
    newState: 0,
  });

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getDocs(collection(db, "orders"));
      const ordersData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrders(ordersData);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteOrder = async () => {
    if (deleteOrder.orderId) {
      await deleteDoc(doc(db, "orders", deleteOrder.orderId));
      setOrders(orders.filter((order) => order.id !== deleteOrder.orderId));
      setDeleteOrder({ show: false, orderId: null });
    }
  };

  const handleUpdateOrderState = async () => {
    const stateWasExisted =
      updateOrder.orderData.deliveryState.length > 0
        ? updateOrder.orderData.deliveryState?.find(
            (state) =>
              parseInt(state.stateCode) === parseInt(updateOrder.newState)
          )
        : false;

    if (updateOrder.orderData && !stateWasExisted) {
      const orderRef = doc(db, "orders", updateOrder.orderData.id);
      let stateMessage = "";
      if (parseInt(updateOrder.newState) === 0) {
        stateMessage = "Đang chờ xác nhận";
      } else if (parseInt(updateOrder.newState) === 1) {
        stateMessage = "Đã xác nhận";
      } else if (parseInt(updateOrder.newState) === 2) {
        stateMessage = "Đang giao hàng";
      } else {
        stateMessage = "Giao hàng thành công";
      }
      await updateDoc(orderRef, {
        deliveryState: [
          ...updateOrder.orderData.deliveryState,
          {
            date: new Date().toISOString(),
            stateCode: updateOrder.newState,
            stateMessage: stateMessage,
          },
        ],
      });
      setOrders(
        orders.map((order) =>
          order.id === updateOrder.orderId
            ? { ...order, deliveryState: updateOrder.newState }
            : order
        )
      );
      setUpdateOrder({ show: false, orderId: null, newState: "" });
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative w-full h-full">
      <h2 className="font-medium w-full text-xl py-5 px-5 uppercase border-b-[1px] border-b-solid border-b-[rgba(0,0,0,.2)]">
        Danh sách đơn hàng
      </h2>
      {deleteOrder.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 sm:p-6 w-[90%] sm:w-auto rounded-md shadow-md">
            <h3 className="text-lg font-medium mb-4">Xác nhận xóa đơn hàng</h3>
            <p className="mb-4">
              Bạn có chắc chắn muốn xóa đơn hàng này không?
            </p>
            <div className="flex justify-end gap-x-4">
              <button
                onClick={() => setDeleteOrder({ show: false, orderId: null })}
                className="px-4 py-2 border-[2px] border-solid border-[#081F5C] rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteOrder}
                className="bg-[#081F5C] text-white py-2 px-4 rounded-md"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {updateOrder.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-medium mb-4">
              Cập nhật trạng thái đơn hàng
            </h3>
            <select
              value={updateOrder.newState}
              onChange={(e) =>
                setUpdateOrder({ ...updateOrder, newState: e.target.value })
              }
              className="px-4 py-2 border rounded-md w-full mb-4"
            >
              <option value="">Chọn trạng thái</option>
              <option value={0}>Đang chờ xác nhận</option>
              <option value={1}>Đã xác nhận</option>
              <option value={2}>Đang giao hàng</option>
              <option value={3}>Đã giao hàng</option>
            </select>
            <div className="flex justify-end gap-x-4">
              <button
                onClick={() =>
                  setUpdateOrder({ show: false, orderId: null, newState: "" })
                }
                className="px-4 py-2 border-[2px] border-solid border-[#081F5C] rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateOrderState}
                className="bg-[#081F5C] text-white py-2 px-4 rounded-md"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between sm:items-center mt-4 px-4 flex-col sm:flex-row gap-y-4 ">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng..."
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
            <div className="px-3 py-3 w-[20%]">Mã đơn</div>
            <div className="px-3 py-3 w-[20%]">Tên khách hàng</div>
            <div className="px-3 py-3 w-[15%]">Tổng thanh toán</div>
            <div className="px-3 py-3 w-[20%] text-center">Trạng thái</div>
            <div className="px-3 py-3 w-[20%] text-center">Hành động</div>
          </div>
          {currentItems.map((order, i) => (
            <div
              className="flex items-center bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-sm"
              key={i}
            >
              <div className="px-3 py-3 w-[5%] text-center">
                {indexOfFirstItem + i + 1}
              </div>
              <div
                className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[20%] overflow-hidden text-ellipsis"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {order.id}
              </div>
              <div className="px-3 py-3 w-[20%]">{order.username}</div>
              <div className="px-3 py-3 w-[15%]">${order.totalAmount}</div>
              <div className="px-3 py-3 w-[20%] text-left">
                {
                  order?.deliveryState[order?.deliveryState.length - 1]
                    ?.stateMessage
                }
              </div>
              <div className="flex gap-x-2 justify-center items-center px-3 py-3 w-[20%]">
                <button
                  className="px-4 py-2 rounded"
                  onClick={() =>
                    setUpdateOrder({
                      ...updateOrder,
                      show: true,
                      orderData: order,
                    })
                  }
                >
                  <FaPencil />
                </button>
                <button
                  className="px-4 py-2 rounded"
                  onClick={() =>
                    setDeleteOrder({ show: true, orderId: order.id })
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

export default OrderList;
