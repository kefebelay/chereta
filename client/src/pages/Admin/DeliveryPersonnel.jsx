import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Api from "../Auth/Axios";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import Popup from "../../components/common/Popup";
import SignUp from "../../components/DeliveryPersonnel/SignUp";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function DeliveryPersonnel() {
  const [ispopup, setPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [personnel, setPersonnel] = useState([]);
  const [selectedID, setSelectedID] = useState();
  const [userChanged, setUserChanged] = useState(1);
  const [infoClick, setInfoClick] = useState(false);
  const ITEMS_PER_PAGE = 8;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(personnel, ITEMS_PER_PAGE);

  async function handleDelete() {
    const res = await Api.delete(`/api/user/${selectedID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
      },
    });
    if (res.status === 200) {
      toast.success(res.data.message);
      setUserChanged(userChanged + 1);
    } else {
      toast.error(res.data.message);
    }
  }

  useEffect(() => {
    async function getPersonnel() {
      const res = await Api.get("/api/delivery_persons", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPersonnel(res.data);
    }
    getPersonnel();
  }, [userChanged]);

  return (
    <div>
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      {ispopup && (
        <Popup
          message={"Are you sure you want to delete this user?"}
          popup={ispopup}
          setPopup={setPopup}
          onYes={handleDelete}
        />
      )}
      <div
        className={`flex-1 px-10 ${
          isOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 p-7`}
      >
        <h1 className="text-3xl mt-12 text-center font-bold text-primary">
          Delivery Personnel
        </h1>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Current Delivery Personnel
          </h2>
          <table className="min-w-full bg-white border border-text2">
            <thead>
              <tr className="border-b border-text2">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Phone Number</th>
                <th className="text-left py-2 px-4">Vehicle Type</th>
                <th className="text-left py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((person) => (
                <React.Fragment key={person.id}>
                  <tr
                    onClick={() => setInfoClick(!infoClick)}
                    className="hover-m-2 hover:border hover:border-text2 transition-transform duration-500 cursor-pointer mb-2"
                  >
                    <td className="py-2 px-4">{person.username}</td>
                    <td className="py-2 px-4">{person.email}</td>
                    <td className="py-2 px-4">{person.phone_number}</td>
                    <td className="py-2 px-4">
                      {person.actor.vehicle || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => {
                          setSelectedID(person.actor.user_id);
                          setPopup(true);
                        }}
                        className="btn bg-primary text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {infoClick && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="pb-4 px-4">
                        <div className="p-4 rounded">
                          <h2 className="text-xl font-bold mb-2">
                            User Details
                          </h2>
                          <p>
                            <strong>Name:</strong> {person.name}
                          </p>
                          {person.actor && (
                            <div>
                              {person.actor.age && (
                                <p>
                                  <strong>Age:</strong> {person.actor.age}
                                </p>
                              )}
                              {person.actor.gender && (
                                <p>
                                  <strong>Gender:</strong> {person.actor.gender}
                                </p>
                              )}
                              <p>
                                <strong>Address:</strong> {person.actor.address}
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
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Add New Delivery Personnel
          </h2>

          <SignUp />
        </div>
      </div>
    </div>
  );
}
