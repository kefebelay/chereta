import { useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Axios from "axios";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";

export default function DeliveryPersonnel() {
  const [popup, setPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [personnel, setPersonnel] = useState([]);
  const [newPersonnel, setNewPersonnel] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    age: "",
    gender: "",
    vehicleType: "",
  });

  const ITEMS_PER_PAGE = 8;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(personnel, ITEMS_PER_PAGE);
  function handleDelete(id) {
    setPopup(!popup);
    console.log("deleted" + { id });
  }

  useEffect(() => {
    async function getPersonnel() {
      const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
      setPersonnel(res.data);
    }
    getPersonnel();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPersonnel({ ...newPersonnel, [name]: value });
  };

  const handleAddPersonnel = async () => {
    const res = await Axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newPersonnel
    );
    setPersonnel([...personnel, res.data]);
    setNewPersonnel({ name: "", email: "", vehicleType: "" });
  };

  return (
    <div>
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 px-10 ${
          isOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 p-7`}
      >
        <h1 className="text-3xl mt-12 text-center font-bold text-primary">
          Delivery Personnel
        </h1>
        {popup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-35">
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 bg-transparent">
                Are you sure you want to delete this user?
              </h2>
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
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Current Delivery Personnel
          </h2>
          <table className="min-w-full bg-white border border-text2">
            <thead>
              <tr className=" border-b border-text2">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Phone Number</th>
                <th className="text-left py-2 px-4">Vehicle Type</th>
                <th className="text-left py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((person) => (
                <tr
                  key={person.id}
                  className=" hover-m-2 hover:border hover:border-text2 transition-transform duration-500 cursor-pointer mb-2"
                >
                  <td className="py-2 px-4">{person.name}</td>
                  <td className="py-2 px-4">{person.email}</td>
                  <td className="py-2 px-4">{person.phone}</td>
                  <td className="py-2 px-4">{person.vehicleType || "N/A"}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => {
                        handleDelete(person.id);
                      }}
                      className="btn bg-primary text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Add New Delivery Personnel
          </h2>
          <div className="bg-transparent border-text2 p-6 rounded shadow-lg">
            <div className="mb-4">
              <label className="block  text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={newPersonnel.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                placeholder="Enter name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={newPersonnel.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={newPersonnel.phone_number}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="vehicleType"
              >
                Vehicle Type
              </label>
              <select
                name="vehicleType"
                value={newPersonnel.vehicleType}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight "
              >
                <option value="">Select vehicle type</option>
                <option value="Car">Car</option>
                <option value="Motorbike">Motorbike</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Moving Truck">Moving Truck</option>
              </select>
            </div>
            <button
              onClick={handleAddPersonnel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Personnel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
