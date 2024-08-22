import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
// import { LuEdit } from "react-icons/lu";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useState, useEffect } from "react";
import { db } from "../../firebase_setup/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useToast } from "rc-toastr";
const AdminFeedback = ({ handleShowModal }) => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState();
  const [reply, setReply] = useState();
  const [fbId, setFbId] = useState("");
  const [pl, setPublic] = useState(false);
  const addData = async () => {
    await getDocs(collection(db, "feedbacks")).then((response) => {
      const responsedData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFeedback(responsedData);
    });
  };

  useEffect(() => {
    addData();
  }, []);

  const handleResponsingUserFeedback = (id) => {
    setFbId(id);
  };

  const handlePublic = (e) => {
    if (e.target.checked) {
      setPublic(true);
    } else {
      setPublic(false);
    }
  };

  const handleReplyFeedback = async (id) => {
    if (reply) {
      await updateDoc(doc(db, "feedbacks", id), {
        response: reply,
        public: pl,
      });
      toast("Reply success");
    } else {
      toast("Reply field is empty! Type something");
    }
  };
  return (
    <div>
      <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        {feedback?.map((item, index) => {
          return (
            <ol
              key={index}
              className="mt-3 divide-y divider-gray-200 dark:divide-gray-700"
            >
              <li>
                <div className="items-center block p-3 sm:flex sm:gap-x-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="w-8 h-8 bg-slate-100 flex justify-center items-center rounded-full text-xl">
                    <BiSolidUserCircle />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.user}
                      </span>{" "}
                      submitted a response
                      <span className="font-medium text-gray-900 dark:text-white">
                        {" "}
                        {item.date}
                      </span>
                    </div>
                    <div className="text-sm font-normal flex items-center gap-x-1">
                      <p>"{item.content}"</p>{" "}
                      <button
                        className="bg-white p-2 rounded-lg"
                        onClick={() => handleResponsingUserFeedback(item.id)}
                      >
                        {/* <LuEdit /> */}
                      </button>
                    </div>
                    {item.public ? (
                      <span className="inline-flex items-center gap-x-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        <span>
                          <AiFillEye />
                        </span>
                        <span>Public</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-x-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        <span>
                          <AiFillEyeInvisible />
                        </span>
                        <span>Private</span>
                      </span>
                    )}
                    {item.id === fbId && (
                      <div className="flex flex-col items-start sm:flex-row sm:justify-center sm:items-center gap-x-5 gap-y-2 w-full">
                        <div className="flex justify-center items-center gap-x-1">
                          <p>Public</p>
                          <input
                            type="checkbox"
                            value={pl}
                            onChange={(e) => handlePublic(e)}
                          />
                        </div>
                        <input
                          value={reply}
                          type="text"
                          placeholder="Reply..."
                          onChange={(e) => setReply(e.target.value)}
                        />
                        <div className=" flex gap-x-2 ">
                          <button
                            className="border border-solid border-slate-600 rounded-sm   px-3 py-2"
                            onClick={() => setFbId("")}
                          >
                            Cancle
                          </button>
                          <button
                            className="bg-red-500 text-white rounded-sm px-3 py-2"
                            onClick={() => handleShowModal(item.id)}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleReplyFeedback(item.id)}
                            className="border border-solid border-slate-600 rounded-sm px-3 py-2 bg-slate-800 text-white"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ol>
          );
        })}
      </div>
    </div>
  );
};

export default AdminFeedback;
