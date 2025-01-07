import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import Underline from "../../components/common/Underline";
import Pagination from "../../components/common/Pagination";
import { toast } from "react-toastify";
import Api from "../Auth/Axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../hooks/Users_Hook";

const PAGE_SIZE = 7;

export default function Comments() {
  const [isOpen, setIsOpen] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await Api.get("api/seller/comments", {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    }

    fetchComments();
  }, []);

  const handleReplyChange = (event, commentId) => {
    setReplyText({ ...replyText, [commentId]: event.target.value });
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyText[commentId]?.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    try {
      const response = await Api.post(
        `api/seller/comments/${commentId}/reply`,
        {
          user_id: user.id,
          listing_id: comments.find((comment) => comment.id === commentId)
            .listing_id,
          comment: replyText[commentId],
        },
        {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), response.data.reply],
              }
            : comment
        )
      );
      setReplyText({ ...replyText, [commentId]: "" });
      toast.success("Reply posted successfully!");
    } catch (error) {
      toast.error("Failed to post reply. Please try again.");
    }
  };

  const totalPages = Math.ceil(comments.length / PAGE_SIZE);
  const paginatedComments = comments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 px-10 ml-64 transition-margin duration-300 p-7">
        <h1 className="text-3xl font-bold text-center text-primary p-3">
          Comments
        </h1>
        <Underline w="full" mt={2} mb={10} />
        <div className="space-y-4">
          {paginatedComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-transparent border border-text2 p-4 rounded-lg shadow-sm"
            >
              <h2 className="text-primary text-lg mb-2">
                Product: {comment.listing.title}
              </h2>
              <p className="text-primary mb-2">
                <span className="font-semibold text-text">Comment: </span>
                &quot;{comment.comment}&quot;
              </p>
              <p className="text-sm text-text2 mb-4">
                By: {comment.user.username}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <input
                  type="text"
                  placeholder="Reply to this comment..."
                  value={replyText[comment.id] || ""}
                  onChange={(event) => handleReplyChange(event, comment.id)}
                  className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                />
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  className="bg-primary text-white rounded-md p-2 mt-2 md:mt-0 md:ml-2"
                >
                  Reply
                </button>
              </div>
              {/* Display Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-2">
                  {comment.replies.map((rep, index) => (
                    <div key={index} className="ml-4 p-2 border-l-2">
                      <p className="text-sm font-semibold">
                        {rep.user.username}
                      </p>
                      <p className="">{rep.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
