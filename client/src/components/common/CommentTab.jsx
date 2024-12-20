import { useContext, useEffect, useState } from "react";
import Api from "../../pages/Auth/Axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersContext } from "../../hooks/Users_Hook";

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
      const response = await Api.post("api/comments", {
        listing_id: id,
        user_id: user.id,
        text: newComment,
      });

      setComments([...comments, response.data]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const handleReply = async (commentId) => {
    if (!reply[commentId]?.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    try {
      const response = await Api.post("api/replies", {
        comment_id: commentId,
        user_id: user.id,
        text: reply[commentId],
      });

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
      {/* Display Existing Comments */}
      <div className="space-y-5">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-md">
              <p className="text-lg font-semibold">{comment.user_name}</p>
              <p className="text-gray-600">{comment.text}</p>

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
                      <p className="text-sm font-semibold">{rep.user_name}</p>
                      <p className="text-gray-500">{rep.text}</p>
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

      {/* Add New Comment */}
      <div className="mt-5">
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
    </div>
  );
}
