import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Axios from "axios";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";

export default function Reports() {
  const [isOpen, setIsOpen] = useState(true);
  const [reports, setReports] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const ITEMS_PER_PAGE = 8;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(reports, ITEMS_PER_PAGE);

  useEffect(() => {
    async function getReports() {
      const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
      setReports(res.data);
    }
    getReports();
  }, []);

  const handleRowClick = (reportId) => {
    setSelectedReportId(selectedReportId === reportId ? null : reportId);
  };

  const handleBanSeller = (sellerId) => {
    setPopup(!popup);
    console.log(`Seller with ID ${sellerId} has been banned.`);
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
            onClick={() => {
              setPopup(!popup);
            }}
          >
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 bg-transparent">
                Are you sure you want to ban this Seller?
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
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Total Reports: {reports.length}
          </h2>
          <table className="min-w-full bg-white border border-text2">
            <thead>
              <tr className="bg-gray-100 border-b border-text2">
                <th className="text-left py-2 px-4">Listing Title</th>
                <th className="text-left py-2 px-4">Seller Username</th>
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
                    <td className="py-2 px-4">{report.name}</td>
                    <td className="py-2 px-4">{report.username}</td>
                    <td className="py-2 px-4">
                      {Math.floor(Math.random() * 100) + 1}
                    </td>
                    <td className="py-2 px-4">Reason for report</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-primary hover:bg-secondary text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleBanSeller(report.id)}
                      >
                        Ban Seller
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
                            <strong>Listing Title:</strong> {report.name}
                          </p>
                          <p>
                            <strong>Seller Username:</strong> {report.username}
                          </p>
                          <p>
                            <strong>Company Name:</strong> {report.company.name}
                          </p>
                          <p>
                            <strong>Address:</strong> {report.address.city}
                          </p>
                          <p>
                            <strong>Report Reason:</strong> Detailed reason for
                            the report
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
