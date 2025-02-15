import React from "react";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { db } from "../../firebase_setup/firebase";
import { useToast } from "rc-toastr";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
const AdminSigninForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const addUserAccount = async (email, password) => {
    await addDoc(collection(db, "admin"), {
      email: email,
      password: password,
      ic: null,
    });
  };

  const onSubmit = async (data) => {
    const icRef = doc(db, "admin", "fUiBzoGCBaf2TP3xyNTD");
    const ic = await getDoc(icRef);
    if (data.password === data.confirmpassword && data.ic === ic.data().ic) {
      await addUserAccount(data.email, data.password);
      reset();
      toast("Sign in success");
    } else if (
      data.password === data.confirmpassword &&
      data.ic !== ic.data().ic
    ) {
      toast("Introduction Code is wrong");
    } else if (
      data.password !== data.confirmpassword &&
      data.ic === ic.data().ic
    ) {
      toast("Password and Confirm Password are invalid");
    } else if (
      data.password !== data.confirmpassword &&
      data.ic !== ic.data().ic
    ) {
      toast("Confirm password or introduction code is wrong");
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-[30px] mx-auto md:min-h-screen">
          <Link to="/">
            <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              {/* <img className="w-8 h-8 mr-2" src={logo} alt="logo" /> */}
              Paul To Shop
            </p>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Admin Sign In
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register("email", {
                      required: "* This field is required!",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "* Email invalid",
                      },
                    })}
                  />
                  <span className="text-[red] py-1">
                    {errors.email && errors.email.message}
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password", {
                      required: "* This field is required!",
                    })}
                  />
                  <span className="text-[red] py-1">
                    {errors.password && errors.password.message}
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("confirmpassword", {
                      required: "* This field is required!",
                    })}
                  />
                  <span className="text-[red] py-1">
                    {errors.confirmpassword && errors.confirmpassword.message}
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Introduction Code
                  </label>
                  <input
                    type="text"
                    name="ic"
                    id="ic"
                    placeholder="AbxZ..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("ic", {
                      required: "* This field is required!",
                    })}
                  />
                  <span className="text-[red] py-1">
                    {errors.ic && errors.ic.message}
                  </span>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  If you are admin, let's log in!{" "}
                  <Link to="/admin/login">
                    <span className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Log in
                    </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSigninForm;
