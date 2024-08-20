import { useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

// Helper function to generate random price, time left, and image URL
const generateRandomBidData = (bid) => ({
  ...bid,
  price: (Math.random() * 1000).toFixed(2), // Mock price between 0 and 1000
  timeLeft: `${Math.floor(Math.random() * 24)}h ${Math.floor(
    Math.random() * 60
  )}m`, // Mock time left
  imageUrl: `https://via.placeholder.com/150?text=Item+${bid.id}`, // Mock image URL
});

export default function MyBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual API endpoint later
  const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    // Fetch the live bids
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        // Generate mock data for price, time left, and image
        const mockBids = data.slice(0, 10).map(generateRandomBidData);
        setBids(mockBids);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-20">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-primary font-extrabold text-center">
          My Bids
        </h1>
        {loading ? (
          <p className="text-center mt-10">Loading bids...</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bids.map((bid) => (
              <div key={bid.id} className="border rounded-lg p-4 shadow">
                <img
                  src={bid.imageUrl}
                  alt={`Item ${bid.id}`}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-xl font-bold mt-4">{bid.title}</h2>
                <p className="mt-2">{bid.body}</p>
                <p className="mt-4 text-lg text-gray-800 font-semibold">
                  Price: ${bid.price}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Time Left: {bid.timeLeft}
                </p>
                <p className="mt-4 text-sm text-gray-600">Bid ID: {bid.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
