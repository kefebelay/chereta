import { useContext, useEffect, useState } from "react";
import CoolerRemainingTime from "../../../components/common/CoolerRemaining-time";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Api from "../../Auth/Axios";
import { toast } from "react-toastify";
import { UsersContext } from "../../../hooks/Users_Hook";
import { AiOutlineHeart } from "react-icons/ai";

export default function Item() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [tab, setTab] = useState("description");
  const [bid, setBid] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const { url, user } = useContext(UsersContext);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBidIncrement = () => {
    setBid((prevBid) => prevBid + 1);
  };

  const handleBidInput = (e) => {
    const value = Number(e.target.value);
    if (value <= item.winning_bid_amount) {
      toast.error("Your bid must be higher than the current highest bid.");
      return;
    }
    setBid(value);
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const placeBid = async () => {
    if (bid <= 0) {
      toast.error("Please enter a valid bid amount");
      return;
    }

    try {
      const response = await Api.post("api/bid", {
        listing_id: id,
        user_id: user.id,
        bid_amount: bid,
      });
      toast.success("Bid placed successfully!");
      const updatedItem = await Api.get(`api/listing/${id}`);
      setItem(updatedItem.data);
    } catch (err) {
      toast.error("Failed to place bid. Please try again.");
    }
  };

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
            ? { ...comment, replies: [...(comment.replies || []), response.data] }
            : comment
        )
      );
      setReply((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply posted successfully!");
    } catch (error) {
      toast.error("Failed to post reply. Please try again.");
    }
  };

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
  

  useEffect(() => {
    async function getItems() {
      try {
        setisLoading(true);
        const items = await Api.get(`api/listing/${id}`);
        setItem(items.data);
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    }
    getItems();
  }, [id]);

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="px-10 mt-16">
          <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Image Section */}
            <div className="flex-1 flex justify-center items-center">
              <img
                src={url + item.image}
                alt={item.title}
                className="rounded-lg object-cover h-100 w-100 shadow-lg"
              />
            </div>

            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="mt-8">
                <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                <p className="text-2xl font-semibold mb-2 text-primary">Birr: {item.starting_price}</p>

                <div className="my-2">
                  <h2 className="text-base font-bold mb-2">Remaining Time</h2>
                  <CoolerRemainingTime
                    bidEndTime={item.bid_end_time}
                    createdAt={item.created_at}
                    className="text-x+s"
                  />
                </div>

                <hr className="my-2 border-gray-300" />
                <p className="text-lg">Starting Bid: Birr {item.starting_price}</p>
                <hr className="my-2 border-gray-300" />
                <p className="text-lg mt-2">Highest Bid: Birr {item.winning_bid_amount || 0}</p>
                <hr className="my-2 border-gray-300" />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="number"
                  value={bid}
                  onChange={handleBidInput}
                  className="p-2 border rounded w-24"
                  placeholder={item.winning_bid_amount || item.starting_price}
                />
                <button
                  onClick={handleBidIncrement}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={placeBid}
                  className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Bid
                </button>
                <button
                  onClick={toggleFavorite}
                  className={`text-2xl ${isFavorite ? "text-blue-600" : "text-primary"}`}
                >
                  <AiOutlineHeart />
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* Tab Section */}
          <div className="mt-10">
            <ul className="flex justify-center gap-10 text-lg">
              <li
                onClick={() => setTab("description")}
                className={`cursor-pointer px-4 py-2 border-b-4 ${
                  tab === "description" ? "border-primary text-primary" : "border-gray-300"
                }`}
              >
                Description
              </li>
              <li
                onClick={() => setTab("bids")}
                className={`cursor-pointer px-4 py-2 border-b-4 ${
                  tab === "bids" ? "border-primary text-primary" : "border-gray-300"
                }`}
              >
                Bid History
              </li>
              <li
                onClick={() => setTab("comments")}
                className={`cursor-pointer px-4 py-2 border-b-4 ${
                  tab === "comments" ? "border-primary text-primary" : "border-gray-300"
                }`}
              >
                Comments
              </li>
            </ul>

            {tab === "description" && (
              <div className="mt-5 px-10">
                <p className="text-lg">{item.description}</p>
              </div>
            )}

            {tab === "bids" && (
              <div className="mt-5 px-10">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Date</th>
                      <th className="border p-2">Bid Amount</th>
                      <th className="border p-2">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.bids && item.bids.length > 0 ? (
                      item.bids.map((bid, index) => (
                        <tr key={index} className="text-center">
                          <td className="border p-2">{bid.date}</td>
                          <td className="border p-2">Birr {bid.bid_amount}</td>
                          <td className="border p-2">{bid.user_name || "Anonymous"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="border p-2 text-center">No bids yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

{tab === "comments" && (
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
                  prev[comment.id] ? { ...prev, [comment.id]: false } : { ...prev, [comment.id]: true }
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
                    setReply((prev) => ({ ...prev, [comment.id]: e.target.value }))
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
)}

          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
