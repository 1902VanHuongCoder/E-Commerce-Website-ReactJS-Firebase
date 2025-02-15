import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db } from "../firebase_setup/firebase";
import { useToast } from "rc-toastr";
import RingLoader from "react-spinners/RingLoader";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import fashionImg from "../assets/portrait-young-beautiful-hipster-bad-girl-black-leather-jacket-earring-her-nose-sexy-carefree-smiling-woman-sitting-studio-pink-wig-near-blue-wall-confident-model-sunglasses-Photoroom.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to add a new user account to the database
  const addUserAccount = async (username, password) => {
    await addDoc(collection(db, "users_account"), {
      username: username,
      password: password,
      role: "user",
    });
  };

  // Function to handle the sign-in process
  const handleSignin = async (data) => {
    setLoading(true);
    if (data.password === data.confirmpassword) {
      const collection_ref = collection(db, "users_account");
      const q = query(collection_ref, where("username", "==", data.email));
      const doc_ref = await getDocs(q);

      const res = [];
      doc_ref.forEach((order) => {
        res.push({
          ...order.data(),
        });
      });

      // Check if the email is already registered
      if (res.length > 0) {
        toast("Đăng ký thất bại! Tài khoản này đã được đăng ký");
      } else {
        addUserAccount(data.email, data.password);
        toast("Đăng ký thành công");
        navigate("/dangnhap");
        reset();
      }
    } else {
      toast("Mật khẩu và xác nhận mật khẩu không khớp");
    }
    setLoading(false);
  };

  return (
    <div className="font-roboto relative max-w-screen h-screen flex justify-center items-center bg-[#F8FBFF]">
      <div className="absolute top-0 right-0 font-bodonimoda text-[#091F5B] font-bold text-3xl sm:text-6xl flex justify-center sm:items-center w-full sm:w-[500px] h-full -z-2">
        <h1 className="sm:rotate-90 sm:translate-x-[120px] h-fit w-full text-center pt-10">
          ANNBI STORE
        </h1>
      </div>
      <div className="relative sm:w-[450px] w-full p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-[#091F5B] md:text-2xl dark:text-white">
          ĐĂNG KÝ TÀI KHOẢN
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
              placeholder="name@company.com"
              {...register("email", {
                required: "Trường này không được để trống",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email chưa hợp lệ",
                },
              })}
            />
            <span className="text-[red] py-1 text-xs mt-2">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("password", {
                required: "Trường này không được để trống",
                maxLength: {
                  value: 15,
                  message: "Mật khẩu phải lớn hơn 15 ký tự!",
                },
                minLength: {
                  value: 8,
                  message: "Mật khẩu phải lớn hơn 8 ký tự!",
                },
              })}
            />
            <span className="text-[red] py-1 text-xs mt-2">
              {errors.password && errors.password.message}
            </span>
            <div
              className="absolute right-0 bottom-3 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmpassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("confirmpassword", {
                required: "Trường này không được để trống",
              })}
            />
            <span className="text-[red] py-1 text-xs mt-2">
              {errors.confirmpassword && errors.confirmpassword.message}
            </span>
            <div
              className="absolute right-0 bottom-3 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            onClick={handleSubmit(handleSignin)}
            type="submit"
            className={`w-full text-white uppercase ${
              loading ? "bg-white" : "bg-[#091F5B]"
            } hover:bg-[#364EB0] focus:ring-4 focus:outline-none focus:ring-[#7097D2] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
          >
            {loading ? <RingLoader color="#e67af3" size={38} /> : "Đăng ký"}
          </button>
        </form>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Nếu bạn đã có tài khoản{" "}
          <Link to="/dangnhap">
            <span className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
              Đăng nhập
            </span>
          </Link>
        </p>
      </div>
      <div className="h-screen sm:block hidden">
        <img
          class="h-full object-top"
          src={fashionImg}
          alt="A model with her outfit"
        />
      </div>
    </div>
  );
};

export default Signin;
