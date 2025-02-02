import { useContext, useEffect, useState } from "react";
import CoolerRemainingTime from "../../../components/common/CoolerRemaining-time";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Api from "../../Auth/Axios";
import { toast } from "react-toastify";
import { UsersContext } from "../../../hooks/Users_Hook";
import Cookies from "js-cookie";
import CommentTab from "../../../components/common/CommentTab";
import BidsTab from "../../../components/common/BidsTab";
import { FcAbout } from "react-icons/fc";
import ReportForm from "../../../components/common/ReportForm";
import Favorites from "../../../components/common/Favorites";

export default function Item() {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [tab, setTab] = useState("description");
  const [bid, setBid] = useState(
    item.winning_bid_amount || item.starting_price || 0
  );
  const [isLoading, setisLoading] = useState(true);
  const { url, user } = useContext(UsersContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const redirect = useNavigate();

  const handleBidIncrement = () => {
    setBid((prevBid) => prevBid + 1);
  };

  const handleBidInput = (e) => {
    const value = Number(e.target.value);

    setBid(value);
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const placeBid = async () => {
    if (bid <= 0) {
      toast.error("Please enter a valid bid amount");
      return;
    }
    if (bid <= item.winning_bid_amount) {
      toast.error("Your bid must be higher than the current highest bid.");
      return;
    }

    try {
      if (!user) {
        toast.info("You must be logged in to place a bid.");
        redirect("/login");
        return;
      }
      await Api.post(
        "api/bid",
        {
          listing_id: id,
          user_id: user.id,
          bid_amount: bid,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        }
      );
      toast.success("Bid placed successfully!");
      const updatedItem = await Api.get(`api/listing/${id}`);
      setItem(updatedItem.data);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.error);
    }
  };

  useEffect(() => {
    async function getItems() {
      try {
        setisLoading(true);
        const items = await Api.get(`api/listing/${id}`);
        setItem(items.data);
        setBid(items.data.winning_bid_amount || items.data.starting_price || 0);
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    }
    getItems();
  }, [id]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="px-10 mt-16">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Image Section */}
              <div className="flex-1 flex justify-center items-center">
                <img
                  src={url + item.image}
                  alt={item.title}
                  className="rounded-lg object-cover h-100 w-100 shadow-lg"
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="mt-8">
                  <div className="flex justify-between  bg-transparent">
                    <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                    <FcAbout
                      className="text-3xl cursor-pointer"
                      onClick={openPopup}
                    />
                  </div>
                  <p className="text-2xl font-semibold mb-2 text-primary">
                    Birr: {item.starting_price}
                  </p>

                  <div className="my-2">
                    <h2 className="text-base font-bold mb-2">Remaining Time</h2>
                    <CoolerRemainingTime
                      bidEndTime={item.bid_end_time}
                      createdAt={item.created_at}
                      className="text-x+s"
                    />
                  </div>

                  <hr className="my-2 border-gray-300" />
                  <p className="text-lg">
                    Starting Bid: Birr {item.starting_price}
                  </p>
                  <hr className="my-2 border-gray-300" />
                  <p className="text-lg mt-2">
                    Highest Bid: Birr {item.winning_bid_amount || 0}
                  </p>
                  <hr className="my-2 border-gray-300" />
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="number"
                    value={bid}
                    onChange={handleBidInput}
                    className="p-2 border rounded w-24"
                    placeholder={item.winning_bid_amount || item.starting_price}
                    min={item.starting_price}
                  />

                  <button
                    onClick={handleBidIncrement}
                    className="bg-gray-200 px-4 py-2 rounded text-primary"
                  >
                    +
                  </button>
                  <button
                    onClick={placeBid}
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    Bid
                  </button>
                  <Favorites item={item} />
                </div>
                <p className="p-2 text-red-600">{message}</p>
              </div>
            </div>
          </div>

          {/* Tab Section */}
          <div className="mt-10">
            <ul className="flex justify-center gap-10 text-lg">
              <li
                onClick={() => setTab("description")}
                className={`cursor-pointer px-4 py-2 border-b-4 ${
                  tab === "description"
                    ? "border-primary text-primary"
                    : "border-gray-300"
                }`}
              >
                Description
              </li>
              <li
                onClick={() => setTab("bids")}
                className={`cursor-pointer px-4 py-2 border-b-4 ${
                  tab === "bids"
                    ? "border-primary text-primary"
                    : "border-gray-300"
                }`}
              >
                Bid History
              </li>
              <li
                onClick={() => setTab("comments")}
                className={`cursor-pointer px-4 py-2 border-b-4 ${
                  tab === "comments"
                    ? "border-primary text-primary"
                    : "border-gray-300"
                }`}
              >
                Comments
              </li>
            </ul>

            {tab === "description" && (
              <div className="mt-5 px-10">
                <p className="text-lg">{item.description}</p>
              </div>
            )}

            {tab === "bids" && <BidsTab id={id} />}

            {tab === "comments" && <CommentTab id={id} />}
          </div>
        </div>
      )}
      <Footer />

      {isPopupOpen && (
        <ReportForm item={item} user={user} onClose={closePopup} />
      )}
    </div>
  );
}
