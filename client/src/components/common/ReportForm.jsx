/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Api from "../../pages/Auth/Axios";
import Cookies from "js-cookie";
import { UsersContext } from "../../hooks/Users_Hook";
import { toast } from "react-toastify";

export default function ReportForm({ item, user, onClose }) {
  const [reportData, setReportData] = useState({
    itemId: item.id,
    seller_id: item.user.id,
    reason: "",
    customReason: "",
  });
  const { token } = useContext(UsersContext);
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.info("You must be logged in to report an item.");
      return;
    }
    try {
      const { itemId, seller_id, reason, customReason } = reportData;
      const reportPayload = {
        listing_id: itemId,
        user_id: user.id,
        seller_id: seller_id,
        reason: reason || "Inappropriate content",
        custom_reason: customReason || "",
      };
      await Api.post(`/api/listing/${itemId}/report`, reportPayload, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="p-6 rounded shadow-lg w-96 ">
        <h2 className="text-xl font-bold mb-4">Report Item</h2>
        <form onSubmit={handleReportSubmit}>
          <label className="block mb-2">
            Reason:
            <select
              className="block w-full mt-1 p-2 border rounded"
              value={reportData.reason}
              onChange={(e) =>
                setReportData({ ...reportData, reason: e.target.value })
              }
            >
              <option value="Inappropriate">Inappropriate</option>
              <option value="Fake">Fake</option>
              <option value="Spam">Spam</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="block mb-4">
            Custom Reason:
            <input
              type="text"
              className="block w-full mt-1 p-2 border rounded"
              value={reportData.customReason}
              onChange={(e) =>
                setReportData({
                  ...reportData,
                  customReason: e.target.value,
                })
              }
            />
          </label>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-black bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
