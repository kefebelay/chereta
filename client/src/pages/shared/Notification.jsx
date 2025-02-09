import { useState, useEffect, useContext } from "react";
import Pagination from "../../components/common/Pagination";
import ThemeSwitcher from "../../components/common/ThemeSwitcherBtn";
import usePagination from "../../hooks/usePagination";
import Api from "../Auth/Axios";
import { UsersContext } from "../../hooks/Users_Hook";
import Cookies from "js-cookie";

export default function Notification() {
  const ITEMS_PER_PAGE = 6;
  const { user } = useContext(UsersContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedNotification, setExpandedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await Api.get(`api/notifications/${user.id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(notifications, ITEMS_PER_PAGE);

  const markAsRead = async (id) => {
    try {
      await Api.put(
        `api/mark-as-read/${id}`,
        {},
        {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        }
      );
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const toggleNotification = (id) => {
    if (expandedNotification === id) {
      setExpandedNotification(null);
    } else {
      setExpandedNotification(id);
      markAsRead(id);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await Api.delete(`api/notifications/${id}`, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="bg-bgColor min-h-screen">
      <nav className="flex justify-between px-9 h-12 items-center w-full fixed border-b border-text2 shadow-sm shadow-primary bg-bgColor">
        <button onClick={() => history.back()} className="btn">
          <i className="fa-solid fa-arrow-left text-2xl text-primary"></i>
        </button>
        <div className="flex">
          <ThemeSwitcher />
        </div>
      </nav>

      <h1 className="pt-20 text-center text-3xl font-bold text-primary">
        Notifications
      </h1>

      <div className="mt-10 px-5">
        {loading ? (
          <p className="text-center text-text2 p-10">Loading...</p>
        ) : notifications.length > 0 ? (
          <ul className="space-y-4">
            {currentItems.map((notification) => (
              <li
                key={notification.id}
                className="shadow-md rounded-lg p-4 border border-text2 flex flex-col"
              >
                <div
                  className="cursor-pointer flex justify-between items-center"
                  onClick={() => toggleNotification(notification.id)}
                >
                  <h2
                    className={`text-lg font-semibold ${
                      notification.read ? "text-gray-400" : "text-primary"
                    }`}
                  >
                    {notification.title}
                  </h2>
                  {!notification.read && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                {expandedNotification === notification.id && (
                  <div className="mt-2">
                    <p className="text-text2">{notification.description}</p>
                    <p className="text-text3 text-sm mt-2">
                      {notification.time}
                    </p>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete this notification"
                      className="mt-2 text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-text2 p-10">No notifications yet.</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
