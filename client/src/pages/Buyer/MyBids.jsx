import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { FilterSidebar } from "../../components/Buyer/FilterSidebar";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";
import Pagination from "../../components/common/Pagination";

export default function BidPage() {
const [bids, setBids] = useState([]);
const [filteredBids, setFilteredBids] = useState([]);
const [filters, setFilters] = useState({
category: "",
status: { winning: false, ongoing: false, lost: false },
favoriteOnly: false,
});
const { user, url } = useContext(UsersContext);

useEffect(() => {
const fetchBids = async () => {
try {
const response = await Api.get(`/api/my-bids/${user.id}`);
setBids(response.data.bids);
} catch (error) {
console.error("Error fetching bids:", error);
}
};

if (user) fetchBids();
}, [user]);

useEffect(() => {
const applyFilters = () => {
let filtered = [...bids];
const { category, status, favoriteOnly } = filters;

if (category) {
filtered = filtered.filter(
(bid) => bid.listing.category_id.toString() === category
);
}
if (status.winning) {
filtered = filtered.filter(
(bid) => bid.listing.status !== "active" && bid.listing.winner_id === user.id
);
}
if (status.ongoing) {
filtered = filtered.filter((bid) => bid.listing.status === "active");
}
if (status.lost) {
filtered = filtered.filter(
(bid) => bid.listing.status !== "active" && bid.listing.winner_id !== user.id
);
}
if (favoriteOnly) {
filtered = filtered.filter((bid) => bid.is_favorite);
}

setFilteredBids(filtered);
};

applyFilters();
}, [filters, bids, user]);

const ITEMS_PER_PAGE = 5;
const [currentPage, setCurrentPage] = useState(1);

const paginatedBids = filteredBids.slice(
(currentPage - 1) * ITEMS_PER_PAGE,
currentPage * ITEMS_PER_PAGE
);

const navigate = useNavigate();

return (
<div className="mt-20 relative">
    <button onClick={()=> navigate("/orderlist")}
        className="absolute top-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
        >
        <FaTruck className="text-xl" />
    </button>

    <Navbar />
    <div className="flex gap-5">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="w-4/5 mx-auto">
            <div className="p-5 m-4 shadow rounded">
                <h2 className="font-bold text-lg mb-4">My Bids</h2>
                <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Listing ID</th>
                            <th scope="col" className="px-6 py-3">Starting Bid</th>
                            <th scope="col" className="px-6 py-3">Your Bid</th>
                            <th scope="col" className="px-6 py-3">Highest Bid</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedBids.length > 0 ? (
                        paginatedBids.map((bid) => (
                        <tr key={bid.id} onClick={() => navigate(`/product/${bid.listing_id}`)} 
                        className="border-b border-text2 hover:border-b-primary hover:border-b-4 transition-transform duration-300">
                          
                            <td>
                                <img className="h-8 w-8" src={url + bid.listing.image} alt={bid.listing.title} />
                            </td>
                            <td className="px-6 py-4">{bid.listing.title}</td>
                            <td className="px-6 py-4">{bid.listing_id}</td>
                            <td className="px-6 py-4">{bid.listing.starting_price}</td>
                            <td className="px-6 py-4">{bid.bid_amount}</td>
                            <td className="px-6 py-4">{bid.listing.winning_bid_amount}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded ${ bid.listing.status
                                    === "active" ? "bg-green-100 text-green-700" : bid.listing.status === "ended"
                                    ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700" }`}>
                                    {bid.listing.status}
                                </span>
                            </td>

                        </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="7"
                            className="text-center py-6 text-gray-500 italic"
                            >No bids match the selected filters.</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredBids.length / ITEMS_PER_PAGE)}
                    onPageChange={(page)=> setCurrentPage(page)}
                    />
            </div>
            </div>
        </div>
    </div>
    <Footer />
</div>
);
}
