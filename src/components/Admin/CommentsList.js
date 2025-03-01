import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import Loading from "../Loading";

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
      <h2 className="font-medium py-5 px-5"># Feedbacks</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, i) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={i}
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{comment.user}</td>
                <td className="px-6 py-4">{comment.content}</td>
                <td className="px-6 py-4">{comment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsList;
