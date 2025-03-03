import React, { useEffect } from "react";
import { db } from "../../firebase_setup/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useToast } from "rc-toastr";

function UpdateProduct({ productData, handleCloseUpdateModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      uproductName: productData.productName,
      uproductType: productData.productType,
      uproductPrice: productData.productPrice,
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    setValue("uproductName", productData.productName);
    setValue("uproductType", productData.productType);
    setValue("uproductPrice", productData.productPrice);
  }, [productData, setValue]);

  const update = async (data) => {
    await updateDoc(doc(db, "products", productData.id), {
      productName: data.uproductName,
      productType: data.uproductType,
      productPrice: data.uproductPrice,
    });
    toast("Cập nhật sản phẩm thành công");
    reset();
    window.location.reload(true);
  };

  return (
    <div className="mx-4 mt-5 border-[1px] border-solid border-[rgba(0,0,0,.1)]">
      <div>
        <h1 className="py-3 w-full text-center text-white bg-[#081F5C] font-medium">
          CẬP NHẬT SẢN PHẨM
        </h1>
        <div className="w-full p-2 sm:p-5 flex justify-center items-center">
          <div className="w-full sm:w-[60%] p-4 flex flex-col gap-y-4">
            <div className="w-full">
              <div className="flex mb-1 flex-col sm:flex-row justify-between sm:items-center gap-y-2">
                <label htmlFor="uproductName" className="">
                  Tên sản phẩm
                </label>
                <input
                  id="uproductName"
                  className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                  type="text"
                  placeholder="Tên sản phẩm"
                  {...register("uproductName", {
                    required: "Trường này không thể để trống",
                    minLength: {
                      value: 5,
                      message: "Tên sản phẩm phải dài hơn 5 ký tự",
                    },
                    maxLength: {
                      value: 40,
                      message: "Tên sản phẩm phải ngắn hơn 40 ký tự",
                    },
                  })}
                />
              </div>
              {errors.uproductName && (
                <div className="text-[red] py-1 text-sm flex justify-end">
                  <div className="w-full sm:w-[70%] text-left">
                    {errors.uproductName.message}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full">
              <div className="flex mb-1 flex-col sm:flex-row justify-between sm:items-center gap-y-2">
                <label htmlFor="uproductType" className="">
                  Loại sản phẩm
                </label>
                <input
                  id="uproductType"
                  className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                  type="text"
                  placeholder="Loại sản phẩm"
                  {...register("uproductType", {
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
              {errors.uproductType && (
                <div className="text-[red] py-1 text-sm flex justify-end">
                  <div className="w-full sm:w-[70%] text-left">
                    {errors.uproductType.message}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full">
              <div className="flex mb-1 flex-col sm:flex-row justify-between sm:items-center gap-y-2">
                <label htmlFor="uproductPrice" className="">
                  Giá
                </label>
                <input
                  id="uproductPrice"
                  className="w-full sm:w-[70%] rounded-md focus:border-[#081F5C] focus:border-[1px] focus:border-solid outline-none"
                  type="number"
                  placeholder="Giá sản phẩm"
                  {...register("uproductPrice", {
                    required: "Trường này không thể để trống",
                  })}
                />
              </div>
              {errors.uproductPrice && (
                <div className="text-[red] py-1 text-sm flex justify-end">
                  <div className="w-full sm:w-[70%] text-left">
                    {errors.uproductPrice.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full pb-4 px-4 font-medium flex justify-end gap-x-4">
          <button
            onClick={handleCloseUpdateModal}
            className="px-4 py-2 border-[2px] border-solid border-[#081F5C] rounded-md"
          >
            Hủy cập nhật
          </button>
          <button
            className="bg-[#081F5C] text-white py-2 px-4 rounded-md disabled:opacity-50"
            onClick={handleSubmit(update)}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
