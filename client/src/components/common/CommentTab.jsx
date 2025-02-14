import { useContext, useEffect, useState } from "react";
import Api from "../../pages/Auth/Axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersContext } from "../../hooks/Users_Hook";
import Cookies from "js-cookie";
import { FaTrash } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
export default function CommentTab() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState({});
  const [showAllComments, setShowAllComments] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // default to descending order
  const { id } = useParams();
  const { user } = useContext(UsersContext);

  async function fetchComments() {
    try {
      const response = await Api.get(`api/comments/${id}`, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  }

  useEffect(() => {
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTimeout(() => {
        if (response.data.user) {
          setComments([...comments, response.data]);
          setNewComment("");
          fetchComments();
          toast.success("Comment added successfully!");
        } else {
          toast.success("Comment added successfully!");

          setNewComment("");

          fetchComments();
        }
      }, 2000);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

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
      setReply((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply posted successfully!");
    } catch (error) {
      toast.error("Failed to post reply. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const comment = comments.find((comment) => comment.id === commentId);
      if (comment.user_id !== user.id) {
        toast.error("You can only delete your own comments.");
        return;
      }

      await Api.delete(`api/comments/${commentId}`, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  const sortedComments = [...comments]
    .filter((comment) => !comment.parent_id) // Filter out comments with a parent_id
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    });

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

      {/* Sort Comments */}
      <div className="mb-5">
        <label className="mr-2">Sort by date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Display Existing Comments */}
      <div className="space-y-5">
        {sortedComments.length > 0 ? (
          sortedComments
            .slice(0, showAllComments ? sortedComments.length : 5)
            .map((comment) => (
              <div key={comment.id} className="border p-4 rounded-md">
                <div className="flex items-center gap-1 py-2">
                  <img
                    src={
                      comment.user.image ||
                      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    }
                    alt={comment.user.username || "User"}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <p className="text-lg font-semibold">
                    {comment.user.username || "user"}
                  </p>
                  {comment.user_id === user.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="ml-auto text-red-600"
                    >
                      <FaTrash />
                    </button>
                  )}
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
                          {rep.user?.username || "Unknown User"}
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

      {sortedComments.length > 5 && (
        <button
          onClick={() => setShowAllComments(!showAllComments)}
          className="text-blue-600 mt-2"
        >
          {showAllComments ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
