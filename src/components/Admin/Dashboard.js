import React, { useContext, useState } from "react";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import EditProduct from "./EditProduct";
import CommentsList from "./CommentsList";
import adminAvatar from "../../assets/adminAvatar.png";
import { AppContext } from "../Context/AppContext";
import { useToast } from "rc-toastr";
import {
  BiLogOut,
  BiListUl,
  BiEdit,
  BiCommentDetail,
  BiCart,
} from "react-icons/bi";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { user, logout } = useContext(AppContext);
  const { toast } = useToast();

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductList />;
      case "orders":
        return <OrderList />;
      case "edit":
        return <EditProduct />;
      case "comments":
        return <CommentsList />;
      default:
        return <ProductList />;
    }
  };

  // Function to handle logout
  const handleLogOut = () => {
    logout();
    toast("Đăng xuất thành công");
    localStorage.removeItem("loggedInAccount");
    window.location.reload(true);
  };

  return (
    <div className="w-full relative">
      <div className="w-[20%] fixed left-0 top-0 bg-[#081F5C] text-white h-screen">
        <div className="flex items-center flex-col p-4 border-b-[1px] border-b-solid border-b-[rgba(255,255,255,0.1)]">
          <img
            src={adminAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="opacity-50 text-sm">Quản trị viên</span>
          <span>{user?.username}</span>
        </div>
        <ul className="flex flex-col p-4">
          <li
            className={`p-2 cursor-pointer flex items-center gap-x-2 ${
              activeTab === "products" ? "bg-[#334AEC]" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            <BiListUl />
            Danh sách sản phẩm
          </li>
          <li
            className={`p-2 cursor-pointer flex items-center gap-x-2 ${
              activeTab === "orders" ? "bg-[#334AEC]" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <BiCart />
            Đơn hàng
          </li>
          <li
            className={`p-2 cursor-pointer flex items-center gap-x-2 ${
              activeTab === "edit" ? "bg-[#334AEC]" : ""
            }`}
            onClick={() => setActiveTab("edit")}
          >
            <BiEdit />
            Cập nhật sản phẩm
          </li>
          <li
            className={`p-2 cursor-pointer flex items-center gap-x-2 ${
              activeTab === "comments" ? "bg-[#334AEC]" : ""
            }`}
            onClick={() => setActiveTab("comments")}
          >
            <BiCommentDetail />
            Bình luận
          </li>
        </ul>
        <div className="absolute w-full bottom-0 border-t-[1px] border-t-solid border-t-[rgba(255,255,255,0.1)]">
          <button
            onClick={handleLogOut}
            className="w-full text-white p-2 hover:bg-white hover:text-gray-800 flex items-center justify-center gap-x-2"
          >
            <span>
              <BiLogOut />
            </span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
      <div className="w-[80%] absolute right-0 top-0">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
