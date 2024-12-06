import React, { useState } from "react";

export const FilterSidebar = () => {
  const [filters, setFilters] = useState({
    category: "",
    status: {
      winning: false,
      ongoing: false,
      lost: false,
    },
    favoriteOnly: false,
  });

  // Handle filter changes
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFilters({
      ...filters,
      status: { ...filters.status, [e.target.name]: e.target.checked },
    });
  };

  const handleFavoriteToggle = () => {
    setFilters({ ...filters, favoriteOnly: !filters.favoriteOnly });
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      status: { winning: false, ongoing: false, lost: false },
      favoriteOnly: false,
    });
  };

  return (
    <div className="w-1/6 bg-white shadow-lg p-5 rounded-lg">
       <div className="flex gap-4">
           <h2 className="text-xl font-semibold text-black-700 mb-4">Filter</h2>
           <button
          onClick={resetFilters}
          className="w-1/2 py-2 border border-primary text-blue-500 rounded-lg hover:bg-blue-100"
        >
          Reset
        </button>
        <hr className="my-5" />
       </div>

      {/* Item Category */}
      <div className="mb-5">
        <label htmlFor="category" className="block text-black-600 mb-2">Item Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring border-primary focus:ring-blue-200"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="vehicles">Vehicles</option>
          <option value="clothing">Clothing</option>
          <option value="art">Art</option>
        </select>
      </div>

      {/* Status */}
      <div className="mb-5">
        <label className="block text-black-600 mb-2">Status</label>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            name="winning"
            checked={filters.status.winning}
            onChange={handleStatusChange}
            className="w-4 h-4"
          />
          <label>Winning Bids</label>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            name="ongoing"
            checked={filters.status.ongoing}
            onChange={handleStatusChange}
            className="w-4 h-4"
          />
          <label>Ongoing Bids</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="lost"
            checked={filters.status.lost}
            onChange={handleStatusChange}
            className="w-4 h-4"
          />
          <label>Lost Bids</label>
        </div>
      </div>

      {/* Favorite Status */}
      <div className="mb-5">
        <label className="block text-black-600 mb-2">Favorite Status</label>
        <button
          onClick={handleFavoriteToggle}
          className={`w-full py-2 rounded-lg ${
            filters.favoriteOnly ? " bg-blue-500 text-white" : "bg-gray-200 text-blue-600"
          }`}
        >
          {filters.favoriteOnly ? "Favorite Only" : "All"}
        </button>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-5">
        
        <button className="w-1/2 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
          Filter
        </button>
      </div>
    </div>
  );
};