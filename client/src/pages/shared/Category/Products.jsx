import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import SellerProfile from "../../../components/Seller/SellerProfile";
import Api from "../../Auth/Axios";
import { UsersContext } from "../../../hooks/Users_Hook";
import RemainingTime from "../../../components/common/Remaining_time";
import { FcAbout, FcLike } from "react-icons/fc";
import Cookies from "js-cookie";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reportData, setReportData] = useState({
    itemId: null,
    seller_id: null,
    reason: "",
    customReason: "",
  });
  const { url, user } = useContext(UsersContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const itemsResponse = await Api.get("/api/listings");
        setItems(itemsResponse.data);
        console.log(itemsResponse.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const openPopup = (item) => {
    setReportData({
      itemId: item.id,
      seller_id: item.user.id,
      reason: "",
      customReason: "",
    });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
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
      closePopup();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-28 text-primary">
        Products
      </h1>
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div>
          {items.length === 0 ? (
            <h1>No Items</h1>
          ) : (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-9 mt-10 m-3 p-4 place-items-center">
                {items.map(
                  (item) =>
                    item.status !== "ended" && (
                      <div
                        key={item.id}
                        className="max-w-sm rounded-md overflow-hidden shadow-sm shadow-text2
                   hover:-translate-y-1 transition-transform duration-700 p-2"
                      >
                        <Link to={`/seller/info/${item.user.id}`}>
                          <SellerProfile seller={item.user} />
                        </Link>
                        <div className="flex justify-between p-4 bg-transparent">
                          <FcAbout
                            className="text-2xl cursor-pointer"
                            onClick={() => openPopup(item)}
                          />
                          <FcLike className="text-2xl" />
                        </div>
                        <Link
                          to={`/product/${item.id}`}
                          className="block overflow-hidden"
                        >
                          <img
                            className="w-ful rounded-lg hover:scale-110 transition-transform duration-500"
                            src={url + item.image}
                            alt="Image description"
                          />
                          <div className="px-6 pt-4">
                            <h2 className="font-bold text-xl mb-2">
                              {item.title}
                            </h2>
                          </div>
                          <div className="flex justify-between p-4 bg-transparent">
                            <div>
                              <p className="text-birr text-base">
                                Birr: {item.starting_price}
                              </p>
                              <p className="my-1">
                                {" "}
                                <RemainingTime
                                  bidEndTime={item.bid_end_time}
                                  createdAt={item.created_at}
                                />
                              </p>
                            </div>

                            <button className="btn py-2 px-4 rounded-xl bg-primary w-20 text-center text-white">
                              Detail
                            </button>
                          </div>
                        </Link>
                      </div>
                    )
                )}
              </div>
              <h1>{}</h1>
            </div>
          )}
        </div>
      )}
      <Footer />

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className=" p-6 rounded shadow-lg w-96">
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
                  className="px-4 py-2 text-black bg-gray-300 rounded"
                  onClick={closePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
