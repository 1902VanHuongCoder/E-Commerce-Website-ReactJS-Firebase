import React from "react";
import { db } from "../../firebase_setup/firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { useToast } from "rc-toastr";
function UpdateOderState({ orderId, handleCloseUpdateOrderStateModal }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const update = async (dt) => {
    const orderstate = [];
    await getDoc(doc(db, "orders", orderId)).then((response) =>
      response.data().deliveryState.map((state) => {
        orderstate.push(state);
      })
    );
    orderstate.push({ state: dt.orderstate, date: new Date().toDateString() });
    await updateDoc(doc(db, "orders", orderId), {
      deliveryState: orderstate,
    });
    toast("Update product success");
    reset();
    window.location.reload(true);
  };

  return (
    <div
      onClick={handleCloseUpdateOrderStateModal}
      className="fixed w-screen h-screen bg-[rgba(0,0,0,.3)] z-20 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-[250px] sm:w-[350px] h-fit rounded-lg overflow-hidden"
        data-aos="zoom-in"
        data-aos-duration="500"
      >
        <div
          onClick={handleCloseUpdateOrderStateModal}
          className="absolute top-3 right-3 text-2xl text-[red]"
        >
          <IoMdCloseCircle />
        </div>
        <h1 className="py-5 w-full text-center bg-green-300 font-medium">
          Update Product
        </h1>
        <div className="w-full p-5">
          <div className="flex mb-1 flex-col sm:flex-row justify-between items-center">
            <label htmlFor="uproductName" className="hidden sm:block">
              State
            </label>
            <input
              id="orderstate"
              // name="uproductName"
              type="text"
              placeholder="@example: Is delivering..."
              {...register("orderstate", {
                required: "* This field is required",
              })}
            />
          </div>
          {errors.orderstate && (
            <div className="text-[red] py-1 text-sm">
              {errors.orderstate && errors.orderstate.message}
            </div>
          )}
        </div>
        <hr />
        <div className="w-full py-4 font-medium text-center">
          <button
            className="bg-[blue] text-white py-1 px-4"
            onClick={handleSubmit(update)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateOderState;
