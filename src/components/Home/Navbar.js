import { useContext, useState } from "react";
import { FaHome, FaHistory, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AppContext, LoginContext } from "../../contextHelpers";
import { useToast } from "rc-toastr";

import annbiLogo from "../../assets/annbiLogo.png";

export default function NavbarWithDropdown() {
  const { toast } = useToast();
  const { account, setAccount } = useContext(AppContext);
  const { isLogin, func } = useContext(LoginContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle logout
  const handleLogOut = () => {
    func(false);
    setAccount({});
    toast("Đăng xuất thành công");
    localStorage.removeItem("loggedInAccount");
    window.location.reload(true);
  };

  // Function to check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path ? "text-[#364EB0] font-bold" : "";
  };

  return (
    <div className="relative">
      <div className="px-5 py-4 flex flex-col lg:flex-row justify-between items-center bg-[#fff] font-roboto">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <img
            alt="annbi logo brand"
            className="w-auto h-[30px] object-contain"
            src={annbiLogo}
          />
          <div className="block lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-auto mt-4 lg:mt-0 flex-grow lg:flex-grow-0">
          <div className="flex justify-center lg:justify-between items-center">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-[60%] lg:w-[400px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#364EB0]"
            />
            <button className="ml-2 px-4 py-2 bg-[#364EB0] text-white rounded-lg hover:bg-[#2c3e9a] focus:outline-none focus:ring-2 focus:ring-[#7097D2]">
              Tìm kiếm
            </button>
          </div>
        </div>
        <ul className="hidden lg:flex items-center mt-4 lg:mt-0">
          <Link to={"/"}>
            <li className={`inline-block mx-3 uppercase ${isActive("/")}`}>
              Trang chủ
            </li>
          </Link>
          {isLogin && (
            <Link to={"/orderhistory"}>
              <li
                className={`inline-block mx-3 uppercase ${isActive(
                  "/orderhistory"
                )}`}
              >
                Lịch sử
              </li>
            </Link>
          )}
          {isLogin ? (
            <li
              onClick={handleLogOut}
              className="inline-block mx-3 uppercase cursor-pointer"
            >
              Đăng xuất
            </li>
          ) : (
            <Link to={"/dangnhap"}>
              <li
                className={`inline-block mx-3 uppercase ${isActive(
                  "/dangnhap"
                )}`}
              >
                Đăng nhập
              </li>
            </Link>
          )}
          {isLogin && (
            <li className="inline-block mx-3 font-bold">
              <div className="w-8 h-8 rounded-full bg-[#354EB0] flex items-center justify-center text-white">
                {account.username.charAt(0).toUpperCase()}
              </div>
            </li>
          )}
        </ul>
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-5 py-4 flex justify-between items-center bg-[#fff] font-roboto">
            <div>
              <img
                alt="annbi logo brand"
                className="w-auto h-[30px] object-contain"
                src={annbiLogo}
              />
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <ul className="mt-5">
            <Link to={"/"}>
              <li
                className={`block px-4 py-2 text-lg uppercase ${isActive("/")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaHome className="inline-block mr-2" />
                Trang chủ
              </li>
            </Link>
            {isLogin && (
              <Link to={"/orderhistory"}>
                <li
                  className={`block px-4 py-2 text-lg uppercase ${isActive(
                    "/orderhistory"
                  )}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaHistory className="inline-block mr-2" />
                  Lịch sử
                </li>
              </Link>
            )}
            {isLogin ? (
              <li
                onClick={() => {
                  handleLogOut();
                  setIsSidebarOpen(false);
                }}
                className="block px-4 py-2 text-lg uppercase cursor-pointer"
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Đăng xuất
              </li>
            ) : (
              <Link to={"/dangnhap"}>
                <li
                  className={`block px-4 py-2 text-lg uppercase ${isActive(
                    "/dangnhap"
                  )}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaSignInAlt className="inline-block mr-2" />
                  Đăng nhập
                </li>
              </Link>
            )}
            {isLogin && (
              <li className="block px-4 py-2 text-lg font-bold">
                <div className="w-8 h-8 rounded-full bg-[#354EB0] flex items-center justify-center text-white">
                  {account.username.charAt(0).toUpperCase()}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
