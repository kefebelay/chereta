import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import Api from "../Auth/Axios";
import Loading from "../../components/common/Loading";
import Popup from "../../components/common/Popup";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function UserManagement() {
  const [userChanged, setUserChanged] = useState(0);
  const handleDeleteClick = async (userId) => {
    setIsPopup(true);

    const res = await Api.delete(`/api/user/${selectedID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
      },
    });
    if (res.status === 200) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== userId));
      setIsPopup(false);
      toast.success(res.data.message);
      setUserChanged(userChanged + 1);
    } else {
      toast.error(res.data.message);
    }
  };

  const [items, setItems] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [ispopup, setIsPopup] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const ITEMS_PER_PAGE = 8;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(items, ITEMS_PER_PAGE);

  const handleRowClick = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  useEffect(() => {
    async function getUsers() {
      const res = await Api.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data);
      setItems(res.data);
      console.log(res);
    }
    getUsers();
  }, [userChanged]);

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
        {!users ? (
          <div className="grid place-items-center h-screen w-screen">
            <Loading />
          </div>
        ) : (
          <div>
            {ispopup && (
              <Popup
                onYes={handleDeleteClick}
                popup={ispopup}
                setPopup={setIsPopup}
                message={"Are you sure you want to delete this user?"}
              />
            )}
            <div>
              <table className="min-w-full bg-white border border-text2">
                <thead>
                  <tr className="bg-gray-100 border-b border-text2">
                    <th className="text-left py-2 px-4">Username</th>
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
                        <td className="py-2 px-4">{user.phone_number}</td>
                        <td className={``}>
                          <h1
                            className={`py-2 px-2 w-fit text-white rounded-lg ${
                              user.roles.length === 0
                                ? "bg-red-500"
                                : user.roles[0].name === "buyer"
                                ? "bg-teal-500"
                                : user.roles[0].name === "admin"
                                ? "bg-purple-700"
                                : user.roles[0].name === "company_seller"
                                ? "bg-green-700"
                                : user.roles[0].name === "individual_seller"
                                ? "bg-yellow-700"
                                : user.roles[0].name === "delivery_personnel" &&
                                  "bg-orange-700"
                            }`}
                          >
                            {user.roles.length === 0
                              ? "no role"
                              : user.roles[0].name}
                          </h1>
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => {
                              setIsPopup(true);
                              setSelectedID(user.id);
                            }}
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
                              {user.actor !== null && (
                                <div>
                                  {user.actor.age && (
                                    <p>
                                      <strong>Age:</strong> {user.actor.age}
                                    </p>
                                  )}
                                  {user.actor.gender && (
                                    <p>
                                      <strong>Gender:</strong>{" "}
                                      {user.actor.gender}
                                    </p>
                                  )}

                                  <p>
                                    <strong>Address:</strong>{" "}
                                    {user.actor.address}
                                  </p>
                                </div>
                              )}
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
        )}
      </div>
    </div>
  );
}
