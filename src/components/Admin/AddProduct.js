import React, { useState } from "react";
import { db } from "../../firebase_setup/firebase";
import { addDoc, collection } from "firebase/firestore";
import UploadImage from "./UploadImage";
import { useForm } from "react-hook-form";
import { useToast } from "rc-toastr";

const colorsobj = [
  "Blue",
  "Yellow",
  "Red",
  "Milk Yellow",
  "Purple",
  "Black",
  "Brown",
  "White",
  "Light Black",
  "Green",
];

const AddProduct = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [url, setUrl] = useState("");
  const [productColors, setProductColors] = useState([]);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState(colorsobj);

  const handleChooseColorsForProduct = (e) => {
    let colorHaveAlready = productColors.find(
      (color) => e.target.value === color
    );
    if (colorHaveAlready) {
      const newColors = productColors.filter(
        (color) => color !== e.target.value
      );
      setProductColors(newColors);
    } else {
      setProductColors([...productColors, e.target.value]);
    }
  };

  const addProduct = async (data) => {
    await addDoc(collection(db, "products"), {
      stt: data.stt,
      productName: data.productName,
      productType: data.productType,
      productPrice: data.productPrice,
      imageURL: url,
      productColors: productColors,
      details: data.productDetails.split("*"),
    });
    toast("Add product success");
    reset();
    setUrl("");
    setProductColors([]);
  };

  const handleAddProductColor = () => {
    let colorHaveAlready = colors.find(
      (cl) => cl.toLocaleLowerCase() === color.toLocaleLowerCase()
    );
    if (color !== "" && !colorHaveAlready) {
      setColors([...colors, color]);
    } else {
      return;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-between font-medium w-full text-xl py-5 px-5 uppercase border-b-[1px] border-b-solid border-b-[rgba(0,0,0,.2)]">
        <h2>THÊM SẢN PHẨM</h2>
      </div>
      <div className="w-full sm:p-5 flex justify-center items-center">
        <div className="w-full sm:w-[80%] p-4 flex flex-col gap-y-4">
          <div className="w-full">
            <div className="flex mb-1 flex-col sm:flex-row justify-between items-start gap-y-2 sm:items-center">
              <label htmlFor="stt" className="">
                STT
              </label>
              <input
                id="stt"
                className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                type="number"
                min={1}
                placeholder="STT"
                {...register("stt", {
                  required: "Trường này không thể để trống",
                })}
              />
            </div>
            {errors.stt && (
              <div className="text-[red] py-1 text-sm flex justify-end">
                <div className="w-full sm:w-[70%] text-left">
                  {errors.stt.message}
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex mb-1 flex-col sm:flex-row justify-between items-start gap-y-2 sm:items-center">
              <label htmlFor="productName" className="">
                Tên sản phẩm
              </label>
              <input
                id="productName"
                className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                type="text"
                placeholder="Tên sản phẩm"
                {...register("productName", {
                  required: "Trường này không thể để trống",
                  minLength: {
                    value: 5,
                    message: "Tên sản phẩm phải dài hơn 5 ký tự",
                  },
                  maxLength: {
                    value: 80,
                    message: "Tên sản phẩm phải ngắn hơn 80 ký tự",
                  },
                })}
              />
            </div>
            {errors.productName && (
              <div className="text-[red] py-1 text-sm flex justify-end">
                <div className="w-full sm:w-[70%] text-left">
                  {errors.productName.message}
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex mb-1 flex-col sm:flex-row justify-between items-start gap-y-2 sm:items-center">
              <label htmlFor="productType" className="">
                Loại sản phẩm
              </label>
              <input
                id="productType"
                className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                type="text"
                placeholder="Loại sản phẩm"
                {...register("productType", {
                  required: "Trường này không thể để trống",
                  minLength: {
                    value: 3,
                    message: "Loại sản phẩm phải dài hơn 3 ký tự",
                  },
                  maxLength: {
                    value: 20,
                    message: "Loại sản phẩm phải ngắn hơn 20 ký tự",
                  },
                })}
              />
            </div>
            {errors.productType && (
              <div className="text-[red] py-1 text-sm flex justify-end">
                <div className="w-full sm:w-[70%] text-left">
                  {errors.productType.message}
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex mb-1 flex-col sm:flex-row justify-between items-start gap-y-2 sm:items-center">
              <label htmlFor="productPrice" className="">
                Giá sản phẩm
              </label>
              <input
                id="productPrice"
                className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                type="number"
                placeholder="Giá sản phẩm"
                {...register("productPrice", {
                  required: "Trường này không thể để trống",
                })}
              />
            </div>
            {errors.productPrice && (
              <div className="text-[red] py-1 text-sm flex justify-end">
                <div className="w-full sm:w-[70%] text-left">
                  {errors.productPrice.message}
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex mb-1 flex-col sm:flex-row justify-between items-start gap-y-2 sm:items-center">
              <label htmlFor="productDetails" className="">
                Chi tiết sản phẩm
              </label>
              <textarea
                id="productDetails"
                className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                placeholder="Chi tiết sản phẩm"
                {...register("productDetails", {
                  required: "Trường này không thể để trống",
                })}
              ></textarea>
            </div>
            {errors.productDetails && (
              <div className="text-[red] py-1 text-sm flex justify-end">
                <div className="w-full sm:w-[70%] text-left">
                  {errors.productDetails.message}
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <h2 className="mb-2">Chọn màu sắc của sản phẩm</h2>
            <div className="flex items-center flex-wrap gap-2">
              {" "}
              {colors.map((color, i) => (
                <label
                  key={i}
                  className="mr-5 flex items-center flex-row gap-x-2"
                  htmlFor={i + color}
                >
                  <input
                    id={i + color}
                    value={color}
                    type="checkbox"
                    className=""
                    onChange={handleChooseColorsForProduct}
                  />
                  <span> {color}</span>
                </label>
              ))}
            </div>

            <div className="bg-slate-100 my-5 sm:flex sm:flex-row items-center sm:gap-4 p-3 justify-center">
              <label htmlFor="addColor">Thêm màu sắc mới</label>
              <input
                id="addColor"
                type="text"
                placeholder="Màu sắc..."
                className="w-full sm:w-[206px] rounded-md"
                onChange={(e) => setColor(e.target.value)}
              />
              <div className="flex justify-end mt-4 sm:mt-0">
                <button
                  onClick={handleAddProductColor}
                  className="py-3 sm:py-2 px-4 text-white bg-[#081F5C] hover:opacity-50 rounded-md"
                >
                  Thêm màu sắc
                </button>
              </div>
            </div>
          </div>

          <UploadImage setUrl={setUrl} />
          <hr />
          <div className="w-full text-right">
            <button
              onClick={handleSubmit(addProduct)}
              disabled={
                url === "" ||
                productColors.length === 0 ||
                register.productName === "" ||
                register.productType === "" ||
                register.productPrice === "" ||
                register.productDetails === ""
              }
              className="py-3 px-4 w-full sm:w-auto text-white bg-[#081F5C] hover:opacity-50 rounded-md disabled:opacity-50 disabled:cursor-default"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
