import { useState } from "react";
import Pagination from "../../components/common/Pagination";
import ThemeSwitcher from "../../components/common/ThemeSwitcherBtn";
import usePagination from "../../hooks/usePagination";

export default function Notification() {
  const ITEMS_PER_PAGE = 6;
  const empty = 0;

  // Initial fake notifications
  const [notifications, setNotifications] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Notification Title ${index + 1}`,
      description: `This is the description for notification ${
        index + 1
      }. It provides more details about the notification content.`,
      time: `${index + 1} hour${index + 1 > 1 ? "s" : ""} ago`,
    }))
  );

  // Pagination hook
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(notifications, ITEMS_PER_PAGE);

  // Function to delete a notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="bg-bgColor min-h-screen">
      <nav className="flex justify-between px-9 h-12 items-center w-full fixed border-b border-text2 shadow-sm shadow-primary bg-bgColor">
        <button onClick={() => history.back()} className="btn ">
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
        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {currentItems.map((notification) => (
              <li
                key={notification.id}
                className="shadow-md rounded-lg p-4 border border-text2 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    {notification.title}
                  </h2>
                  <p className="text-text2 mt-1">{notification.description}</p>
                  <p className="text-text3 text-sm mt-2">{notification.time}</p>
                </div>
                <div
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete this notification"
                  className="cursor-pointer hover:scale-110 duration-150 bg-transparent"
                >
                  <i className="fa-solid fa-trash text-xl text-red-500"></i>
                </div>
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
