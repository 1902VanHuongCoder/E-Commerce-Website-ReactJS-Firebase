import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase_setup/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useToast } from "rc-toastr";
import { AppContext, LoginContext } from "../../contextHelpers";

import { BiSolidUserCircle } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import logo from "../../assets/annbiLogo.png";

const Feeback = () => {
  const { account } = useContext(AppContext); // Get account information from AppContext
  const { isLogin } = useContext(LoginContext); // Get login status from LoginContext
  const { toast } = useToast(); // Get toast function for notifications
  const [feedback, setFeedback] = useState(""); // State to store user feedback input
  const [feedbacksWereResponsed, setFeedbacksWereResponsed] = useState([]); // State to store feedbacks that were responded

  // Function to handle sending feedback
  const handleSendFeedback = async () => {
    if (isLogin) {
      if (feedback !== "") {
        // Add feedback to Firestore
        await addDoc(collection(db, "feedbacks"), {
          content: feedback,
          user: account.username,
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
  const addData = async () => {
    await getDocs(collection(db, "feedbacks")).then((response) => {
      const responsedData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFeedbacksWereResponsed(responsedData); // Set feedbacks state
    });
  };

  // Fetch feedbacks when component mounts
  useEffect(() => {
    addData();
  }, []);

  return (
    <div className="w-full mt-5 sm:mt-0 sm:p-7 font-roboto">
      <div className="w-full h-fit border-[rgba(0,0,0,.1)] border border-solid mx-auto p-5">
        <div className="w-full flex justify-start items-center gap-x-2 sm:gap-x-3">
          <div className="w-10 h-10 hidden bg-slate-100 sm:flex justify-center items-center rounded-full text-2xl">
            <BiSolidUserCircle />
          </div>
          <input
            value={feedback}
            type="text"
            id="feedback"
            className="rounded-lg h-10"
            placeholder="Bình luận ..."
            onChange={(e) => setFeedback(e.target.value)} // Update feedback state on input change
          />
          <button
            onClick={handleSendFeedback} // Handle send feedback on button click
            className="h-10 px-5 bg-[#364EB0] text-white rounded-lg hover:opacity-80"
          >
            Gửi phản hồi
          </button>
        </div>
        <div>
          <p className="py-5 flex items-center gap-x-2 text-lg sm:mt-5">
            <span>
              <IoIosPricetags />
            </span>{" "}
            <span>Bình luận nổi bật</span>
          </p>
          {feedbacksWereResponsed?.map((item, index) => {
            if (item.public) {
              return (
                <div
                  className="w-full bg-[#E9F2FF] h-fit p-2 py-5 sm:p-5 relative"
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Feeback;
