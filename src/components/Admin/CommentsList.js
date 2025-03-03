import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import Loading from "../Loading";
import Comments from "./Comments";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getDocs(collection(db, "feedbacks"));
      const commentsData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComments(commentsData);
      setLoading(false);
    };

    fetchComments();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="font-medium w-full text-xl py-5 px-5 uppercase border-b-[1px] border-b-solid border-b-[rgba(0,0,0,.2)]">
        Tất cả bình luận
      </h2>
      <Comments />
    </div>
  );
};

export default CommentsList;
