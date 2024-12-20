import { IoFilter } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import Api from "../../pages/Auth/Axios";

export const FilterSidebar = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await Api.get("/api/categories");
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);
  // Handle filter changes
  
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
    <div className="w-1/8 shadow-lg p-5 rounded-lg border-blue-700 m-4 shadow-blue-500">
      <div className="flex gap-5 mb-4">
        <IoFilter size="32" color="blue" className="mr-2" />
        <h2 className="font-semibold text-black-500 w-1/2 py-2 rounded-lg">
          Filter
        </h2>
        <button
          onClick={resetFilters}
          className="w-1/2 py-2 text-blue-500 rounded-lg"
        >
          Reset
        </button>
      </div>
      <hr className="my-5" />

      {/* Item Category */}
      <div className="mb-5">
        <label
          htmlFor="category"
          className="block font-semibold text-black-600 mb-2"
        >
          Item Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-32 p-2 border rounded-lg focus:outline-none focus:ring border-primary text-sm m-2  "
        >
          <option value="">Select Category</option>
          {isLoading !== true &&
            categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {/* Status */}
      <div className="mb-5">
        <label className="block font-semibold text-black-600 mb-2">
          Status
        </label>
        <div className="flex items-center gap-3 mb-2 text-sm">
          <input
            type="checkbox"
            name="winning"
            checked={filters.status.winning}
            onChange={handleStatusChange}
            className="w-4 h-4"
          />
          <label>Winning Bids</label>
        </div>
        <div className="flex items-center gap-3 mb-2 text-sm">
          <input
            type="checkbox"
            name="ongoing"
            checked={filters.status.ongoing}
            onChange={handleStatusChange}
            className="w-4 h-4"
          />
          <label>Ongoing Bids</label>
        </div>
        <div className="flex items-center gap-3 text-sm">
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
      <div className="mb-8">
        <label className="block font-semibold text-black-600 mb-2">
          Favorite Status
        </label>
        <button
          onClick={handleFavoriteToggle}
          className={`w-32 py-2 rounded-lg text-sm border border-primary ${
            filters.favoriteOnly
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-blue-600"
          }`}
        >
          Favorite Only
        </button>
      </div>
    </div>
  );
};
