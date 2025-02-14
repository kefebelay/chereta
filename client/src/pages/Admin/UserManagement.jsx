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
  const [filter, setFilter] = useState("all");
  const [accountTypeFilter, setAccountTypeFilter] = useState("all");

  const ITEMS_PER_PAGE = 8;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(items, ITEMS_PER_PAGE);

  const handleRowClick = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAccountTypeFilterChange = (e) => {
    setAccountTypeFilter(e.target.value);
  };

  const filteredItems = items.filter((item) => {
    if (filter === "all" && accountTypeFilter === "all") return true;
    if (filter !== "all" && accountTypeFilter === "all") {
      if (filter === "verified") return item.actor?.is_verified;
      if (filter === "unverified") return !item.actor?.is_verified;
    }
    if (filter === "all" && accountTypeFilter !== "all") {
      return item.roles[0]?.name === accountTypeFilter;
    }
    if (filter !== "all" && accountTypeFilter !== "all") {
      if (filter === "verified")
        return (
          item.actor?.is_verified && item.roles[0]?.name === accountTypeFilter
        );
      if (filter === "unverified")
        return (
          !item.actor?.is_verified && item.roles[0]?.name === accountTypeFilter
        );
    }
    return true;
  });

  const handleVerifyClick = async (userId, role) => {
    try {
      const endpoint =
        role === "company_seller"
          ? `/api/admin/verify-company-seller/${userId}`
          : `/api/admin/verify-individual-seller/${userId}`;

      const res = await Api.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
          },
        }
      );

      if (res.status === 200) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === userId
              ? { ...item, actor: { ...item.actor, is_verified: true } }
              : item
          )
        );
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to verify user. Please try again.");
      console.error("Error verifying user:", error);
    }
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
        <div className="mb-5">
          <label className="mr-2">Filter by:</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <label className="ml-4 mr-2">Account Type:</label>
          <select
            value={accountTypeFilter}
            onChange={handleAccountTypeFilterChange}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="buyer">Buyer</option>
            <option value="admin">Admin</option>
            <option value="company_seller">Company Seller</option>
            <option value="individual_seller">Individual Seller</option>
            <option value="delivery_personnel">Delivery Personnel</option>
          </select>
        </div>
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
                  {filteredItems.map((user) => (
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
                                : user.roles[0]?.name === "buyer"
                                ? "bg-teal-500"
                                : user.roles[0]?.name === "admin"
                                ? "bg-purple-700"
                                : user.roles[0]?.name === "company_seller"
                                ? "bg-green-700"
                                : user.roles[0]?.name === "individual_seller"
                                ? "bg-yellow-700"
                                : user.roles[0]?.name ===
                                    "delivery_personnel" && "bg-orange-700"
                            }`}
                          >
                            {user.roles.length === 0
                              ? "no role"
                              : user.roles[0]?.name}
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
                          {user.roles[0]?.name === "company_seller" ||
                          user.roles[0]?.name === "individual_seller" ? (
                            <button
                              onClick={() =>
                                handleVerifyClick(user.id, user.roles[0]?.name)
                              }
                              className={`btn font-bold py-1 px-3 rounded-lg ml-2 ${
                                user.actor?.is_verified
                                  ? "bg-gray-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                              disabled={user.actor?.is_verified}
                            >
                              {user.actor?.is_verified ? "Verified" : "Verify"}
                            </button>
                          ) : null}
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
