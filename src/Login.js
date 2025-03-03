import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase_setup/firebase";

import { AppContext } from "./contextHelpers";

import RingLoader from "react-spinners/RingLoader";
import { useToast } from "rc-toastr";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import fashionImg from "./assets/loginimage.png";

const Login = () => {
  const { updateUserData } = useContext(AppContext);
  // Contexts for managing global state
  const { toast } = useToast();

  // Local state for remembering user and loading state
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // Local state for showing password
  const [showPassword, setShowPassword] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle login
  const handleLogin = async (data) => {
    setLoading(true);
    const collection_ref = collection(db, "users_account");
    const q = query(collection_ref, where("username", "==", data.email));
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((account) => {
      res.push({
        id: account.id,
        ...account.data(),
      });
    });

    // Check if the user exists and if the password is correct
    if (res[0]?.username === data.email && res[0]?.password !== data.password) {
      toast("Mật khẩu chưa chính xác!");
    } else if (res[0]?.username !== data.email) {
      toast("Bạn vẫn chưa có tài khoản!");
    } else if (
      res[0]?.username === data.email &&
      res[0]?.password === data.password
    ) {
      toast("Đăng nhập thành công");
      updateUserData(res[0]);
      localStorage.setItem(
        "loggedInAccount",
        JSON.stringify({
          email: data.email,
          userId: res[0].id,
        })
      );
      if (res[0].role === "admin") {
        navigate("/quantrivien");
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  // Function to redirect to sign-in page
  const handleRedirectToSignIn = () => {
    navigate("/dangkytaikhoan");
  };

  return (
    <div className="font-roboto relative max-w-screen h-screen flex justify-center items-center bg-[#F8FBFF]">
      <div className="h-screen sm:block hidden">
        <img
          className="h-full object-top"
          src={fashionImg}
          alt="A model with her outfit"
        />
      </div>
      <div className="absolute top-0 left-0 font-bodonimoda text-[#091F5B] font-bold text-3xl sm:text-6xl flex justify-center sm:items-center w-full sm:w-[500px] h-full -z-2">
        <h1 className="sm:rotate-90 sm:-translate-x-14 h-fit w-full text-center pt-10 hidden sm:block">
          ANNBI STORE
        </h1>
      </div>
      <div className="relative sm:w-[450px] w-full p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-[#091F5B] md:text-2xl dark:text-white">
          ĐĂNG NHẬP
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              {...register("email", {
                required: "Trường này không được để trống",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email chưa hợp lệ!",
                },
              })}
            />
            <div className="text-[red] py-1 text-xs mt-2">
              {errors.email && errors.email.message}
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div
                className="absolute right-0 h-full pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <input
                autoComplete="on"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("password", {
                  required: "Trường này không được để trống",
                })}
              />
            </div>

            <div className="text-[red] py-1 text-xs mt-2">
              {errors.password && errors.password.message}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  onChange={(e) => setRemember(e.target.checked)}
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Ghi nhớ tôi
                </label>
              </div>
            </div>
            <a
              href="http://localhost:3000/login"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Quên mật khẩu?
            </a>
          </div>
          <button
            onClick={handleSubmit(handleLogin)}
            type="submit"
            className={`w-full text-white uppercase ${
              loading ? "bg-white" : "bg-[#091F5B]"
            } hover:bg-[#364EB0] focus:ring-4 focus:outline-none focus:ring-[#7097D2] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
          >
            {loading ? <RingLoader color="#e67af3" size={38} /> : "Đăng nhập"}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Nếu bạn chưa có tài khoản hãy{" "}
            <span
              onClick={handleRedirectToSignIn}
              className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Đăng ký
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
