import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NavbarWithDropdown from "./Home/Navbar";
import { useToast } from "rc-toastr";
import { LoginContext, AppContext } from "../contextHelpers";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase_setup/firebase";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const Order = () => {
  const navigate = useNavigate("/");
  const { account } = useContext(AppContext);
  const { isLogin } = useContext(LoginContext);
  const { toast } = useToast();
  const { productId } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1);
  const [address, setAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const [transportFee] = useState(10);
  const [colorIsChoosed, setColorIsChoosed] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("On delivery");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          toast("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        toast("Tải thông tin sản phẩm thất bại");
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, toast]);

  // Choose amount of products
  const handleDecreAmount = () => {
    if (amount > 1) {
      setAmount((pre) => pre - 1);
    }
  };
  const handleIncreAmount = () => {
    setAmount((pre) => pre + 1);
  };

  // Choose colors of products
  const handleChooseColor = (e) => {
    let color = colorIsChoosed.find((color) => color === e.target.value);
    if (color) {
      const remainingColors = colorIsChoosed.filter(
        (color) => color !== e.target.value
      );
      setColorIsChoosed(remainingColors);
    } else {
      setColorIsChoosed([...colorIsChoosed, e.target.value]);
    }
  };

  // Calculate total money automatically
  useEffect(() => {
    if (product) {
      setTotalAmount(product.productPrice * amount);
    }
  }, [amount, transportFee, product]);

  // When user hit submit, will set these datas to database (firestore - firebase)
  const order = async () => {
    if (isLogin) {
      if (address === "" || phone === "" || colorIsChoosed.length < 0) {
        toast("Đặt hàng không thành công, kiểm tra lại thông tin!");
      } else {
        let date = new Date();
        await addDoc(collection(db, "orders"), {
          phone: phone,
          address: address,
          productId: uuidv4(),
          productAmount: amount,
          totalAmount: totalAmount,
          username: account.username,
          imageURL: product.imageURL,
          productColors: colorIsChoosed,
          deliveryMethod: deliveryMethod,
          productName: product.productName,
          deliveryState: [
            { state: "Wait confirming of boss", date: date.toDateString() },
          ],
        });
        toast("Đặt hàng thành công!");
      }
    } else {
      toast("Đăng nhập để đặt hàng");
      return;
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="relative max-w-screen mx-auto bg-[#FFF]">
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
          ĐẶT HÀNG
        </h1>
        <div className="flex flex-col sm:flex-row sm:p-5 relative">
          <div className="relative w-full sm:basis-[35%] flex justify-center items-center border border-solid border-gray-100 p-4">
            <img
              src={product.imageURL}
              alt={product.productName}
              className="w-full h-[300px] sm:h-[400px] object-contain"
            />
          </div>
          <div className="text-md space-y-2 w-full sm:basis-[65%] relative">
            <h2 className="font-medium text-2xl px-3 sm:px-5">
              {product.productName}
            </h2>
            <p className="px-3 sm:px-5 py-3 text-lg">
              $<span className="font-bold">{product.productPrice}</span>
            </p>
            <hr className="ml-2" />
            <div className="flex justify-start items-center pt-3">
              <p className="px-3 sm:px-5"> Số lượng </p>
              <div className="w-[60%] sm:w-fit flex justify-center items-center">
                <button
                  className="py-0 px-4 h-fit border-[2px] border-solid border-gray-700 text-lg hover:bg-[#091F5B] hover:text-white transition-hover"
                  onClick={handleDecreAmount}
                >
                  -
                </button>
                <span className="py-0 px-4 h-fit border-y-[2px] border-solid border-gray-700 text-lg">
                  {amount < 10 ? `0${amount}` : amount}
                </span>
                <button
                  className="px-4 h-fit border-[2px] border-solid border-gray-700 text-lg hover:bg-[#091F5B] hover:text-white transition-hover"
                  onClick={handleIncreAmount}
                >
                  +
                </button>
              </div>
            </div>
            <div className="sm:flex justify-start items-center py-5 gap-x-5">
              <p className="px-3 sm:px-5 w-full sm:w-[15%] pb-2 sm:pb-0">
                Màu sắc{" "}
              </p>
              <div className="w-full sm:w-fit sm:p-0 px-3 sm:px-5 flex items-center gap-4 flex-wrap">
                {product.productColors.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex justify-center items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        onChange={handleChooseColor}
                      />
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-start sm:items-center px-3 sm:px-5 gap-2">
              <p className="">Phương thức thanh toán</p>
              <select
                className="w-full sm:w-1/2 border border-solid border-gray-300 rounded-md"
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value="On delivery">Khi giao hàng</option>
                <option value="Bank">Chuyển khoản</option>
              </select>
            </div>
            <div className="w-full">
              <p className="font-medium py-5 px-3 sm:px-5">
                Nhập địa chỉ và số điện thoại
              </p>
              <div className="w-full px-3 sm:px-5">
                <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                  <label className="w-full sm:w-auto">Địa chỉ giao hàng</label>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ giao hàng..."
                    className="w-full sm:w-[80%] border border-solid border-gray-300 rounded-md"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <br />
                <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                  <label className="w-full sm:w-auto">Số điện thoại</label>
                  <input
                    type="text"
                    value={phone}
                    placeholder="Nhập số điện thoại của bạn..."
                    className="w-full sm:w-[80%] border border-solid border-gray-300 rounded-md"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center p-2">
              <div className="sm:w-3/5 flex justify-start items-center w-full gap-x-2">
                <p className="font-semibold py-5 sm:px-5 text-black text-xl flex items-end gap-x-4">
                  <span className="text-2xl">
                    <FaMoneyBillAlt />
                  </span>
                  <span>Tổng tiền </span>
                </p>
                <p className="text-2xl sm:text-4xl">${totalAmount}</p>
              </div>
              <div className="sm:w-2/5 flex gap-x-2 w-full items-center justify-between">
                <button className="sm:hidden w-1/2 flex items-center gap-x-2 border-[2px] border-solid border-[#091F5B] py-1.5 px-4 rounded-md">
                  <span>
                    {" "}
                    <FaArrowLeftLong />
                  </span>
                  <span>Quay lại</span>
                </button>
                <button
                  onClick={order}
                  type="button"
                  className="w-full flex justify-center items-center font-medium text-white bg-[#091F5B] rounded-md py-2 px-4"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  ĐẶT HÀNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
