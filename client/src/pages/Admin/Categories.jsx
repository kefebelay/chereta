import React, { useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";

export default function Categories() {
  const [Open, isOpen] = useState(true);
  const [change, setChange] = useState([]);
  const [Categories, setCategories] = useState([
    {
      id: 1,
      name: "Clothing",
    },
    {
      id: 2,
      name: "Electronics",
    },
    {
      id: 3,
      name: "Furniture",
    },
    {
      id: 4,
      name: "Books",
    },
    {
      id: 5,
      name: "Home Decor",
    },
    {
      id: 6,
      name: "Sports",
    },
  ]);
  function onchange(e) {
    const { name, value } = e.target;
    setChange(value);
  }
  function addCategory(e) {
    e.preventDefault();
    setChange("");
    console.log("added category");
  }

  const handleDelete = (CategoryId) => {
    setPopup(!popup);
    console.log(`Seller with ID ${CategoryId} has been banned.`);
  };
  const [popup, setPopup] = useState(false);
  return (
    <div>
      {popup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-35"
          onClick={() => {
            setPopup(!popup);
          }}
        >
          <div className="bg-background p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 bg-transparent">
              Are you sure you want to delete this Category?
            </h2>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setPopup(!popup)}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setPopup(!popup)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <Dashboard isOpen={Open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          Open ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <div className="p-6"></div>
        <h1 className="text-center mt-3 text-3xl font-bold text-primary">
          Category
        </h1>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Total Categories: {Categories.length}
          </h2>
          <table className="min-w-full bg-white border border-text2 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b border-text2">
                <th className="text-left py-2 px-4">Category Name</th>
                <th className="text-left py-2 px-4">Category Id</th>
                <th className="text-left py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {Categories.map((cat) => (
                <React.Fragment key={cat.id}>
                  <tr
                    className="bg-transparent hover-m-2  hover:border-2 
                    hover:border-text2 transition-transform duration-500 cursor-pointer mb-2"
                  >
                    <td className="py-2 px-4">{cat.name}</td>
                    <td className="py-2 px-4">{cat.id}</td>

                    <td className="py-2 px-4">
                      <button
                        className="bg-primary hover:bg-secondary text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>{" "}
        <div className="bg-transparent border border-text2 p-6 rounded-lg shadow-md my-5 ">
          <h3 className="text-xl font-bold mb-6 bg-transparent">
            Add Category
          </h3>
          <div className="mb-4">
            <label className="block  text-sm font-bold">Category Name</label>
            <input
              type="text"
              name="name"
              onChange={onchange}
              value={change}
              className="shadow border border-text2 rounded w-fit py-2 px-3 "
              placeholder="Enter Category name"
            />
            <button onClick={addCategory} className="btn bg-primary m-3">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
