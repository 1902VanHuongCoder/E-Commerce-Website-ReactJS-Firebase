import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import Loading from "../Loading";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="font-medium py-5 px-5"># Orders</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={i}
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.username}</td>
                <td className="px-6 py-4">${order.totalAmount}</td>
                <td className="px-6 py-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
