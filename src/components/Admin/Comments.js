import React, { useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaPen } from "react-icons/fa6";
import { db } from "../../firebase_setup/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useToast } from "rc-toastr";

const Comments = () => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState([]);
  const [reply, setReply] = useState("");
  const [fbId, setFbId] = useState("");
  const [pl, setPublic] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    feedbackId: null,
  });

  const addData = async () => {
    const response = await getDocs(collection(db, "feedbacks"));
    const responsedData = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFeedback(responsedData);
  };

  useEffect(() => {
    addData();
  }, []);

  const handleResponsingUserFeedback = (id) => {
    setFbId(id);
  };

  const handlePublic = (e) => {
    setPublic(e.target.checked);
  };

  const handleReplyFeedback = async (id) => {
    if (reply) {
      await updateDoc(doc(db, "feedbacks", id), {
        response: reply,
        public: pl,
      });
      toast("Phản hồi thành công");
      setReply("");
      setFbId("");
      addData();
    } else {
      toast("Trường phản hồi trống! Vui lòng nhập nội dung");
    }
  };

  const handleDeleteFeedback = async () => {
    if (deleteModal.feedbackId) {
      await deleteDoc(doc(db, "feedbacks", deleteModal.feedbackId));
      toast("Xóa phản hồi thành công");
      setDeleteModal({ show: false, feedbackId: null });
      addData();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-2 px-4 py-5 border border-gray-100 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        {feedback?.map((item, index) => (
          <ol
            key={index}
            className="divide-y divider-gray-200 dark:divide-gray-700 border-[1px] border-solid border-[rgba(0,0,0,.1)] "
          >
            <div className="relative flex justify-between items-center hover:shadow-md dark:hover:bg-gray-700 transition-transform">
              <div className="items-center block p-3 sm:flex sm:gap-x-4 space-y-2 sm:space-y-0">
                <div className="w-[50px] h-[50px] bg-slate-100 flex justify-center items-center rounded-full text-xl">
                  <BiSolidUserCircle />
                </div>
                <div className="px-2 sm:px-0 text-gray-600 dark:text-gray-400">
                  <div className="text-sm font-normal">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.user}
                    </span>{" "}
                    đã gửi phản hồi vào ngày
                    <span className="font-medium text-gray-900 dark:text-white">
                      {" "}
                      {item.date}
                    </span>
                  </div>
                  <div className="text-normal font-normal flex items-center gap-x-1">
                    <p>"{item.content}"</p>{" "}
                  </div>
                  {item.public ? (
                    <span className="inline-flex items-center gap-x-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                      <span>
                        <AiFillEye />
                      </span>
                      <span>Hiển thị</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-x-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                      <span>
                        <AiFillEyeInvisible />
                      </span>
                      <span>Đang ẩn</span>
                    </span>
                  )}
                  {item.id === fbId && (
                    <div className="flex flex-col items-start sm:flex-row sm:justify-center sm:items-center gap-x-5 gap-y-2 w-full mt-4 sm:mt-0">
                      <div className="flex justify-center items-center gap-x-1">
                        <p>Hiển thị</p>
                        <input
                          type="checkbox"
                          checked={pl}
                          onChange={handlePublic}
                        />
                      </div>
                      <input
                        className="rounded-md w-full sm:w-auto"
                        value={reply}
                        type="text"
                        placeholder="Phản hồi..."
                        onChange={(e) => setReply(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button
                          className="border border-solid border-slate-600 rounded-md px-3 py-2"
                          onClick={() => setFbId("")}
                        >
                          Hủy
                        </button>
                        <button
                          className="bg-red-500 text-white rounded-md px-3 py-2"
                          onClick={() =>
                            setDeleteModal({ show: true, feedbackId: item.id })
                          }
                        >
                          Xóa
                        </button>
                        <button
                          onClick={() => handleReplyFeedback(item.id)}
                          className="border border-solid border-slate-600 rounded-md px-3 py-2 bg-slate-800 text-white"
                        >
                          Đăng
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                onClick={() => {
                  fbId !== ""
                    ? setFbId("")
                    : handleResponsingUserFeedback(item.id);
                }}
                className="w-auto sm:w-[50px] h-[50px] sm:relative sm:top-0 sm:right-0 absolute top-2 right-0 flex justify-center items-center hover:bg-[#E7F1FF] rounded-full mr-5"
              >
                <FaPen />
              </div>
            </div>
          </ol>
        ))}
      </div>

      {deleteModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 sm:p-6 w-[90%] sm:w-auto rounded-md shadow-md">
            <h3 className="text-lg font-medium mb-4">Xác nhận xóa phản hồi</h3>
            <p className="mb-4">
              Bạn có chắc chắn muốn xóa phản hồi này không?
            </p>
            <div className="flex justify-end gap-x-4">
              <button
                onClick={() =>
                  setDeleteModal({ show: false, feedbackId: null })
                }
                className="px-4 py-2 border-[2px] border-solid border-[#081F5C] rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteFeedback}
                className="bg-[#081F5C] text-white py-2 px-4 rounded-md"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
