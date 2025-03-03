import React, { useState } from "react";
import { storage } from "../../firebase_setup/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const UploadImage = ({ setUrl }) => {
  const [image, setImage] = useState(null);
  const [percent, setPercent] = useState(null);
  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      // check if file isn't empty, will set image for image state
      setImage(e.target.files[0]);
    }
  };

  const upload = (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `/products/${image.name}`); // create reference to storage in products folder
      const uploadTask = uploadBytesResumable(storageRef, image); // upload image to storage

      uploadTask.on(
        //keep tracking upload process to display nescessary informations
        "state_changed",
        (snapshot) => {
          // return percent of completed upload
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImage(null);
            setUrl(url);
            setPercent(null);
          });
        }
      );
    }
  };
  return (
    <div>
      <h2>Tải ảnh của bạn lên</h2>
      <div className="py-3 sm:px-5 flex justify-between sm:items-center flex-col sm:flex-row">
        <input
          type="file"
          className="rounded-md"
          onChange={handleImage}
          placeholder="Chọn ảnh"
        />
        <button
          disabled={!image}
          onClick={upload}
          className="mt-2 sm:mt-0 py-2 px-3 text-white bg-[blue] hover:opacity-50 rounded-md disabled:opacity-50"
        >
          Tải ảnh lên
        </button>
      </div>
      {percent && (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-5">
          <div
            className="bg-green-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
