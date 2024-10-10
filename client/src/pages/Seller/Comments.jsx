import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import Underline from "../../components/common/Underline";
import Pagination from "../../components/common/Pagination";

// Dummy data for comments
const dummyComments = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  text: `Comment text ${i + 1}`,
  user: `User${i + 1}`,
  product: `Product ${(i % 5) + 1}`,
}));

const PAGE_SIZE = 7;

export default function Comments() {
  const [isOpen, setIsOpen] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (commentId) => {
    console.log(`Seller replied to comment ${commentId}: ${replyText}`);
    setReplyText("");
  };

  const totalPages = Math.ceil(dummyComments.length / PAGE_SIZE);
  const paginatedComments = dummyComments.slice(
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
                Product: {comment.product}
              </h2>
              <p className="text-primary mb-2">
                <span className="font-semibold text-text">Comment: </span>
                &quot;{comment.text}&quot;
              </p>
              <p className="text-sm text-text2 mb-4">By: {comment.user}</p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <input
                  type="text"
                  placeholder="Reply to this comment..."
                  value={replyText}
                  onChange={handleReplyChange}
                  className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                />
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  className="bg-primary text-white rounded-md p-2 mt-2 md:mt-0 md:ml-2"
                >
                  Reply
                </button>
              </div>
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
