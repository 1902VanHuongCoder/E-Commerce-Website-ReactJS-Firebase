import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase_setup/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { AppContext } from "../contextHelpers";

import { useToast } from "rc-toastr";

import logo from "../assets/annbiLogo.png";

import { BiSolidUserCircle } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";

const Feeback = () => {
  const { user } = useContext(AppContext); // Get account information from AppContext
  const { toast } = useToast(); // Get toast function for notifications
  const [feedback, setFeedback] = useState(""); // State to store user feedback input
  const [feedbacksWereResponsed, setFeedbacksWereResponsed] = useState([]); // State to store feedbacks that were responded

  // Function to handle sending feedback
  const handleSendFeedback = async () => {
    if (user) {
      if (feedback !== "") {
        // Add feedback to Firestore
        await addDoc(collection(db, "feedbacks"), {
          content: feedback,
          user: user.username,
          response: null,
          date: new Date().toDateString(),
          public: false,
        });
        toast("Gửi phản hồi thành công"); // Show success toast
        setFeedback(""); // Clear feedback input
      } else {
        toast("Bạn vẫn chưa nhập bình luận"); // Show error toast if feedback is empty
      }
    } else {
      toast("Hãy đăng nhập để bình luận"); // Show error toast if user is not logged in
    }
  };

  // Function to fetch feedbacks from Firestore
  const fetchData = async () => {
    const response = await getDocs(collection(db, "feedbacks"));
    const responsedData = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFeedbacksWereResponsed(responsedData); // Set feedbacks state
  };

  // Fetch feedbacks when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full mt-5 sm:mt-10 sm:p-7 font-roboto">
      <div className="w-full h-fit border-[rgba(0,0,0,.1)] border border-solid mx-auto p-2 pt-7 sm:p-7">
        {/* Input for feedback */}
        <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 hidden bg-slate-100 sm:flex justify-center items-center rounded-full text-2xl">
            <BiSolidUserCircle />
          </div>
          <input
            value={feedback}
            type="text"
            id="feedback"
            className="rounded-lg h-10 w-full sm:w-[50%]"
            placeholder="Bình luận ..."
            onChange={(e) => setFeedback(e.target.value)} // Update feedback state on input change
          />
          <button
            onClick={handleSendFeedback} // Handle send feedback on button click
            className="h-10 px-5 bg-[#364EB0] text-white rounded-lg hover:opacity-80 w-full sm:w-fit"
          >
            Gửi phản hồi
          </button>
        </div>

        {/* Display feedbacks */}
        <div>
          <p className="pt-5 flex items-center gap-x-2 text-lg sm:mt-5">
            <span>
              <IoIosPricetags />
            </span>{" "}
            <span>Bình luận nổi bật</span>
          </p>
          {feedbacksWereResponsed?.map((item, index) => {
            if (item.public) {
              return (
                <div
                  className="w-full bg-white h-fit p-2 py-5 sm:p-5 relative"
                  key={index}
                >
                  <div className="absolute w-[30px] sm:w-[20px] h-[120px] sm:h-[104px] left-[1.4rem] sm:left-[2.1rem] top-[2.5rem] sm:top-[3.3rem] border-l-2 border-l-[#dfdfdf] border-b-[#dfdfdf] border-b-2 -z-5"></div>
                  <div className="flex flex-col w-fit">
                    <div className="flex items-center gap-x-3">
                      <div className="relative w-8 h-8 bg-white flex justify-center items-center rounded-full text-xl">
                        <BiSolidUserCircle />
                      </div>
                      <span className="font-medium">{item.user}</span>
                    </div>
                    <div className="bg-white p-3 ml-[35px] mt-1 rounded-lg w-fit">
                      {item.content}
                    </div>
                    <div className="text-xs self-end text-gray-500 mt-1">
                      {item.date} {/* Display the date of the comment */}
                    </div>
                  </div>
                  <div className="mt-4 ml-[32px]">
                    <div className="flex items-center gap-x-3">
                      <div className="relative w-8 h-8 bg-white flex justify-center items-center rounded-full text-xl overflow-hidden">
                        <img src={logo} alt="logo" />
                      </div>
                      <span className="font-medium">Annbi Store</span>
                    </div>
                    <div className="bg-white p-3 ml-[32px] mt-1 rounded-lg w-fit">
                      {item.response}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Feeback;
