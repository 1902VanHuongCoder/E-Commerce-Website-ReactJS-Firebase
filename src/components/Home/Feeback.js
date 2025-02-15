import React, { useContext } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
// import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { db } from "../../firebase_setup/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useToast } from "rc-toastr";
import { AppContext } from "../Context/AppContext";
import { LoginContext } from "../Context/LoginContext";
const Feeback = () => {
  const {account} = useContext(AppContext);
  const {isLogin} = useContext(LoginContext);
  const { toast } = useToast();
  const [feedback, setFeedback] = useState();
  const [feedbacksWereResponsed, setFeedbacksWereResponsed] = useState();
  const handleSendFeedback = async () => {
    if(isLogin){
      if (feedback !== "") {
        await addDoc(collection(db, "feedbacks"), {
          content: feedback,
          user: account.username,
          response: null,
          date: new Date().toDateString(),
          public: false,
        });
        toast("Sending feedback success");
        setFeedback("");
      } else {
        toast("You haven't entered anything yet!");
      }
    }else{
      toast("Log in please!")
    }
  };

  const addData = async () => {
    await getDocs(collection(db, "feedbacks")).then((response) => {
      const responsedData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFeedbacksWereResponsed(responsedData);
    });
  };

  useEffect(() => {
    addData();
  }, []);

  return (
    <div className="w-full sm:w-[95%] h-fit border-[rgba(0,0,0,.1)] border border-solid mx-auto  p-5 mt-5">
      <div className="w-full flex justify-start items-center gap-x-2 sm:gap-x-5">
        <div className="w-10 h-10 hidden bg-slate-100 sm:flex justify-center items-center rounded-full text-2xl">
          <BiSolidUserCircle />
        </div>
        <input
          value={feedback}
          type="text"
          id="feedback"
          className="rounded-sm h-10"
          placeholder="Comment..."
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          onClick={handleSendFeedback}
          className="h-10 w-16 bg-blue-700 text-white rounded-sm hover:opacity-80"
        >
          Send
        </button>
      </div>
      <div>
        <h1 className="py-5"># All comments</h1>
        {feedbacksWereResponsed?.map((item, index) => {
          if (item.public) {
            return (
              <div
                className="w-full bg-[#f5f5fa] h-fit p-5 relative"
                key={index}
              >
                <div className="absolute w-[20px] h-[84px] left-[2.1rem] top-[3.3rem] border-l-4 border-l-[#dfdfdf] border-b-[#dfdfdf] border-b-4 "></div>
                <div className="">
                  <div className="flex items-center gap-x-1">
                    <div className="w-8 h-8 bg-slate-100 flex justify-center items-center rounded-full text-xl">
                      <BiSolidUserCircle />
                    </div>
                    <span className="bg-[#e2d6fb] p-1 rounded-lg">
                      {item.user}
                    </span>
                  </div>
                  <div className="bg-white p-3 ml-[32px] mt-1 rounded-lg w-fit">
                    {item.content}
                  </div>
                </div>
                <div className="mt-4 ml-[32px]">
                  <div className="flex items-center gap-x-1">
                    <div className="w-8 h-8 bg-slate-100 flex justify-center items-center rounded-full text-xl">
                      {/* <img src={logo} alt="logo" /> */}
                    </div>
                    <span className="bg-[#e2d6fb] p-1 rounded-lg">Shop</span>
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
  );
};

export default Feeback;
