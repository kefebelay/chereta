import { useContext, useEffect, useState } from "react";
import Api from "../../pages/Auth/Axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersContext } from "../../hooks/Users_Hook";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
export default function CommentTab() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState({});
  const { id } = useParams();
  const { user } = useContext(UsersContext);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await Api.get(`api/comments/${id}`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    }

    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      const response = await Api.post(
        "api/comments",
        {
          listing_id: id,
          user_id: user.id,
          comment: newComment,
        },
        {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        }
      );

      setComments([...comments, response.data]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const handleReply = async (commentId) => {
    if (!reply[commentId]) {
      toast.error("Reply cannot be empty.");
      return;
    }

    try {
      const response = await Api.post(
        `api/comments/${commentId}/reply`,
        {
          user_id: user.id,
          listing_id: id,
          comment: reply[commentId],
        },
        {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        }
      );
      console.log(response);

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), response.data],
              }
            : comment
        )
      );
      setReply((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply posted successfully!");
    } catch (error) {
      toast.error("Failed to post reply. Please try again.");
    }
  };
  return (
    <div className="mt-5 px-10">
      {/* Add New Comment */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold">Add a Comment</h3>
        <textarea
          className="border p-2 rounded w-full mt-2"
          rows="3"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-primary text-white py-2 px-4 rounded mt-2"
        >
          Post Comment
        </button>
      </div>
      {/* Display Existing Comments */}
      <div className="space-y-5">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-md">
              <div className="flex items-center gap-1 py-2">
                <img
                  src={
                    comment.user.image ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  }
                  alt={comment.user.username}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <p className="text-lg font-semibold">{comment.user.username}</p>
              </div>
              <p className="ml-5">{comment.comment}</p>

              {/* Reply Section */}
              <button
                onClick={() =>
                  setReply((prev) =>
                    prev[comment.id]
                      ? { ...prev, [comment.id]: false }
                      : { ...prev, [comment.id]: true }
                  )
                }
                className="text-blue-600 mt-2"
              >
                Reply
              </button>

              {reply[comment.id] && (
                <div className="mt-2">
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="Write your reply..."
                    value={reply[comment.id] || ""}
                    onChange={(e) =>
                      setReply((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="bg-primary text-white py-1 px-4 rounded mt-2"
                  >
                    Post Reply
                  </button>
                </div>
              )}

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
          ))
        ) : (
          <p className="text-center text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
