import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";

const EditProduct = ({ productId, handleCloseUpdateModal }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColors, setProductColors] = useState("");
  const [productType, setProductType] = useState("");

  const handleUpdate = async () => {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      productName,
      productPrice,
      productColors: productColors.split(","),
      productType,
    });
    handleCloseUpdateModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Price</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Colors</label>
          <input
            type="text"
            value={productColors}
            onChange={(e) => setProductColors(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Type</label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={handleCloseUpdateModal}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
