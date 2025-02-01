import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Api from "../../pages/Auth/Axios";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Reports() {
  const [isOpen, setIsOpen] = useState(true);
  const [reports, setReports] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const ITEMS_PER_PAGE = 8;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(reports, ITEMS_PER_PAGE);
  async function getReports() {
    const res = await Api.get("/api/listings/reports");
    setReports(res.data.reports);
    console.log(res.data);
  }
  useEffect(() => {
    getReports();
  }, []);

  const handleRowClick = (reportId) => {
    setSelectedReportId(selectedReportId === reportId ? null : reportId);
  };

  const handleAction = (action, sellerId, listingId) => {
    setActionType(action);
    setSelectedSellerId(sellerId);
    setSelectedListingId(listingId);
    setPopup(true);
  };

  const confirmAction = async () => {
    if (actionType === "ban") {
      await Api.post(`/api/seller/${selectedSellerId}/ban`, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      toast.success(`Seller with ID ${selectedSellerId} has been banned.`);
    } else if (actionType === "delete") {
      await Api.delete(`/api/listings/${selectedListingId}`, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      toast.success(`Listing with ID ${selectedListingId} has been deleted.`);
      getReports();
    }
    setPopup(false);
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
          Reports Page
        </h1>
        {popup && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-35"
            onClick={() => setPopup(false)}
          >
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 bg-transparent">
                Are you sure you want to{" "}
                {actionType === "ban"
                  ? "ban this Seller"
                  : "delete this Listing"}
                ?
              </h2>
              <div className="flex justify-center gap-3">
                <button
                  onClick={confirmAction}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={() => setPopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Total Reports: {reports.length}
          </h2>
          <table className="min-w-full bg-white border border-text2">
            <thead>
              <tr className="bg-gray-100 border-b border-text2">
                <th className="text-left py-2 px-4">Listing Title</th>
                <th className="text-left py-2 px-4">reported by</th>
                <th className="text-left py-2 px-4">Report Count</th>
                <th className="text-left py-2 px-4">Report Reason</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((report) => (
                <React.Fragment key={report.id}>
                  <tr
                    onClick={() => handleRowClick(report.id)}
                    className="bg-transparent hover-m-2  hover:border 
                    hover:border-text2 transition-transform duration-500 cursor-pointer mb-2"
                  >
                    <td className="py-2 px-4">{report.listing.title}</td>
                    <td className="py-2 px-4">{report.user.name}</td>
                    <td className="py-2 px-4">1</td>
                    <td className="py-2 px-4">{report.reason}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-primary hover:bg-secondary text-white font-bold py-1 px-3 rounded"
                        onClick={() =>
                          handleAction("ban", report.seller.id, null)
                        }
                      >
                        Ban Seller
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
                        onClick={() =>
                          handleAction("delete", null, report.listing.id)
                        }
                      >
                        Delete Listing
                      </button>
                    </td>
                  </tr>
                  {selectedReportId === report.id && (
                    <tr className="bg-transparent mb-2">
                      <td colSpan="5" className="pb-4 px-4 bg-transparent">
                        <div className="p-4 rounded bg-transparent">
                          <h2 className="text-xl font-bold mb-2">
                            Report Details
                          </h2>
                          <p>
                            <strong>Listing Title:</strong>{" "}
                            {report.listing.title}
                          </p>
                          <p>
                            <strong>Seller Username:</strong> {report.user.name}
                          </p>
                          <p>
                            <strong>Report Reason:</strong> {report.reason}
                          </p>
                          <p>
                            <strong>Report Details:</strong> {report.details}
                          </p>
                          <p>
                            <strong>Listing Description:</strong>{" "}
                            {report.listing.description}
                          </p>
                          <p>
                            <strong>Listing Status:</strong>{" "}
                            {report.listing.status}
                          </p>
                          <p>
                            <strong>Listing Starting Price:</strong>{" "}
                            {report.listing.starting_price}
                          </p>
                          <p>
                            <strong>Listing Winning Bid Amount:</strong>{" "}
                            {report.listing.winning_bid_amount}
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
