import React, { useContext, useState } from "react";
import OrderList from "./OrderList";
import CommentsList from "./CommentsList";
import adminAvatar from "../../assets/adminAvatar.png";
import { AppContext } from "../../Context/AppContext";
import { useToast } from "rc-toastr";
import { BiLogOut, BiListUl, BiCommentDetail, BiCart } from "react-icons/bi";
import Product from "./Product";
import AddProduct from "./AddProduct";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <Product changeActiveTab={() => setActiveTab("addproduct")} />;
      case "orders":
        return <OrderList />;
      case "comments":
        return <CommentsList />;
      case "addproduct":
        return <AddProduct />;
      default:
        return <Product />;
    }
  };

  // Function to handle logout
  const handleLogOut = () => {
    logout();
    toast("Đăng xuất thành công");
    localStorage.removeItem("loggedInAccount");
    navigate("/dangnhap");
  };

  return (
    <div className="w-full relative font-roboto ">
      <div className="w-full h-16 bg-[#081F5C]  flex  sm:hidden items-center justify-between px-4 text-white">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={adminAvatar}
            alt="Admin Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg
            className="h-8 w-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed left-0 top-0 bg-[#081F5C] text-white h-screen w-[80%] max-w-xs z-30 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[20%] md:max-w-none`}
      >
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
            onClick={() => {
              setActiveTab("products");
              setSidebarOpen(false);
            }}
          >
            <BiListUl />
            Danh sách sản phẩm
          </li>
          <li
            className={`p-2 cursor-pointer flex items-center gap-x-2 ${
              activeTab === "orders" ? "bg-[#334AEC]" : ""
            }`}
            onClick={() => {
              setActiveTab("orders");
              setSidebarOpen(false);
            }}
          >
            <BiCart />
            Đơn hàng
          </li>
          <li
            className={`p-2 cursor-pointer flex items-center gap-x-2 ${
              activeTab === "comments" ? "bg-[#334AEC]" : ""
            }`}
            onClick={() => {
              setActiveTab("comments");
              setSidebarOpen(false);
            }}
          >
            <BiCommentDetail />
            Bình luận
          </li>
          <li
            className={`p-2 cursor-pointer flex items-center gap-x-2 ${
              activeTab === "addproduct" ? "bg-[#334AEC]" : ""
            }`}
            onClick={() => {
              setActiveTab("addproduct");
              setSidebarOpen(false);
            }}
          >
            <FiPlusCircle />
            Thêm sản phẩm
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

      <div className="w-full md:w-[80%] relative md:absolute right-0 top-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
