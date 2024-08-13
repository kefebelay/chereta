import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";

// Dummy data for comments
const dummyComments = [
  {
    id: 1,
    text: "Great product!",
    user: "Buyer123",
    product: "Product A",
  },
  {
    id: 2,
    text: "Excellent quality.",
    user: "User456",
    product: "Product B",
  },
];

export default function Comments() {
  const [replyText, setReplyText] = useState("");

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (commentId) => {
    console.log(`Seller replied to comment ${commentId}: ${replyText}`);
    setReplyText("");
  };

  return (
    <div>
      <SellerDashboard isOpen={true} setIsOpen={() => {}} />
      <div className="flex-1 px-10 ml-64 transition-margin duration-300 p-7">
        <h1 className="text-3xl font-bold text-center text-primary p-3">
          Product Comments
        </h1>
        <div className="space-y-4">
          {dummyComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-transparent border border-text2 p-4 rounded-lg shadow-sm"
            >
              <h1 className="text-primary text-center text-lg">
                Product: {comment.product}
              </h1>
              <p className="text-primary">
                <span className="text-text">Comment: </span> &quot;{" "}
                {comment.text} &quot;
              </p>
              <p className="text-sm text-text2">By: {comment.user}</p>
              {/* Seller's reply input */}
              <input
                type="text"
                placeholder="Reply to this comment..."
                value={replyText}
                onChange={handleReplyChange}
                className="border rounded-md p-2 mt-2 w-fit border-text2 "
              />
              <button
                onClick={() => handleReplySubmit(comment.id)}
                className="bg-primary text-white rounded-md p-2 mt-2"
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
