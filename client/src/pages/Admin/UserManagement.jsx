import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Axios from "axios";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";

export default function UserManagement() {
  const AccountType = [
    { Type: "Individual Seller", Color: "bg-orange-500" },
    { Type: "Company Seller", Color: "bg-green-500" },
    { Type: "Buyer", Color: "bg-lime-500" },
    { Type: "Delivery Person", Color: "bg-yellow-500" },
  ];

  const handleDeleteClick = async (userId) => {
    setPopup(!popup);
    console.log("deleting user", userId);
  };

  const [items, setItems] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState(false);

  const ITEMS_PER_PAGE = 8;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(items, ITEMS_PER_PAGE);

  const handleRowClick = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  useEffect(() => {
    async function getUsers() {
      const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
      const usersWithAccountType = res.data.map((user) => {
        const randomIndex = Math.floor(Math.random() * AccountType.length);
        return {
          ...user,
          accountType: AccountType[randomIndex].Type,
          accountColor: AccountType[randomIndex].Color,
        };
      });
      setUsers(usersWithAccountType);
      setItems(usersWithAccountType);
    }
    getUsers();
  }, []);

  return (
    <div className="">
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 px-10 ${
          isOpen ? "ml-64 bg-" : "ml-0"
        } transition-margin duration-300 p-7`}
      >
        <h1 className="text-3xl mt-12 mb-5 text-center font-bold text-primary">
          User management
        </h1>
        {popup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-35">
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 bg-transparent">
                Are you sure you want to delete this user?
              </h2>
              <button
                onClick={() => setPopup(!popup)}
                className="btn bg-primary text-white px-4 py-2 rounded-lg"
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
        <div>
          <table className="min-w-full bg-white border border-text2">
            <thead>
              <tr className="bg-gray-100 border-b border-text2">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Phone</th>
                <th className="text-left py-2 px-4">Account Type</th>
                <th className="text-left py-2 px-4">Manage</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <React.Fragment key={user.id}>
                  <tr
                    onClick={() => handleRowClick(user.id)}
                    className=" mb-5 hover-m-2 hover:border hover:border-text2 transition-transform duration-500 cursor-pointer"
                  >
                    <td className="py-2 px-4">{user.username}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className={``}>
                      <h1
                        className={`py-2 px-2 w-fit text-white rounded-lg ${user.accountColor}`}
                      >
                        {user.accountType}
                      </h1>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="btn bg-primary text-white font-bold py-1 px-3 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {selectedUserId === user.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="pb-4 px-4">
                        <div className="p-4 rounded">
                          <h2 className="text-xl font-bold mb-2">
                            User Details
                          </h2>
                          <p>
                            <strong>Name:</strong> {user.name}
                          </p>
                          <p>
                            <strong>Company Name:</strong> {user.company.name}
                          </p>
                          <p>
                            <strong>Address:</strong> {user.address.city}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
