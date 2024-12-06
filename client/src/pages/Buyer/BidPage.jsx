import React, { useState } from 'react';
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { FilterSidebar } from '../../components/Buyer/FilterSidebar';

export default function BidPage() { 
    const [filteredBids, setFilteredBids] = useState([
        {
            id: 1,
            image: "/path/to/image.jpg",
            title: "Auction Item 1",
            listingId: "123",
            startingBid: 500,
            yourBid: 700,
            highestBid: 1000,
            status: "Winning",
        },
        {
            id: 2,
            image: "/path/to/image2.jpg",
            title: "Auction Item 2",
            listingId: "124",
            startingBid: 800,
            yourBid: 1000,
            highestBid: 1500,
            status: "Ongoing",
        },
    ]);

    return (
        <div className="mt-20">
            <Navbar />
            {/* <div className="text-center m-6">
                <h1 className="text-3xl font-bold text-center mt-24 text-primary">
                    Bid Page
                </h1>
            </div> */}
            <div className="flex  gap-5">
            <FilterSidebar />
            <div className="w-4/5 mx-auto">
                <div className="p-5 bg-white shadow rounded">
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
                                {filteredBids.length > 0 ? (
                                    filteredBids.map((bid) => (
                                        <tr
                                            key={bid.id}
                                            className="bg-white border-b hover:bg-gray-50 text-gray-900"
                                        >
                                            <td className="px-6 py-4">
                                                <img
                                                    src={bid.image}
                                                    alt={bid.title}
                                                    className="w-12 h-12 rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">{bid.title}</td>
                                            <td className="px-6 py-4">{bid.listingId}</td>
                                            <td className="px-6 py-4">{bid.startingBid.toLocaleString()}</td>
                                            <td className="px-6 py-4">{bid.yourBid.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                {bid.highestBid.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded ${
                                                        bid.status === "Winning"
                                                            ? "bg-green-100 text-green-700"
                                                            : bid.status === "Ongoing"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {bid.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-6 text-gray-500 italic"
                                        >
                                            No bids match the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
}
