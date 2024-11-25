import { useContext, useEffect, useState } from "react";
import CoolerRemainingTime from "../../../components/common/CoolerRemaining-time";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Api from "../../Auth/Axios";
import { UsersContext } from "../../../hooks/Users_Hook";

export default function Item() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [tab, setTab] = useState("description");
  const [bid, setBid] = useState(0);
  const [showBidPopup, setShowBidPopup] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const { url } = useContext(UsersContext);

  function onBid() {
    setShowBidPopup(true);
  }

  function placeBid() {
    console.log("Bid placed: ", bid);
    setShowBidPopup(false);
  }

  useEffect(() => {
    async function getItems() {
      try {
        setisLoading(true);
        const items = await Api.get(`api/listing/${id}`);
        console.log(items);
        setItem(items.data);
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    }
    getItems();
  }, [id]);

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="grid h-screen place-items-center ">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="flex md:flex-row-reverse flex-col-reverse px-10 mt-20 gap-3">
            <div className="text-left md:flex-1">
              <div className="w-auto">
                <h1 className="my-5 mt-7 font-extrabold lg:text-4xl text-2xl text-primary hidden md:block">
                  {item.title}
                </h1>
                <div className="  p-2  mb-4">
                  <p className="font-bold bg-transparent text-gray-800">
                    Starting price :
                    <span className="text-birr  bg-transparent">
                      {" "}
                      Birr {item.starting_price}
                    </span>
                  </p>
                </div>
                <div>
                  <h1 className="text-left font-extrabold lg:text-lg text-primary">
                    Remaining time
                  </h1>
                  <CoolerRemainingTime
                    bidEndTime={item.bid_end_time}
                    createdAt={item.created_at}
                  />
                </div>

                <div className=" bg-accent brightness-90 p-2">
                  <p className=" font-bold bg-transparent text-white">
                    Highest bid:
                    <span className=" text-white text-xl bg-transparent">
                      {" "}
                      Birr {item.winning_bid_amount || 0}
                    </span>
                  </p>
                </div>
                <button
                  onClick={onBid}
                  className="btn bg-primary w-32 text-center mt-4 text-white font-bold"
                >
                  Bid
                </button>
              </div>
            </div>
            <div>
              <h1 className="text-center font-extrabold lg:text-4xl text-2xl text-primary md:hidden block">
                {item.title}
              </h1>
              <div className=" h-auto md:flex-1 flex justify-center p-4">
                <img
                  src={url + item.image}
                  className="h-fit w-full  rounded-lg hover:scale-105 transition-transform duration-300 "
                />
              </div>
            </div>
          </div>
          <div>
            <ul className="flex gap-10 m-3 text-center justify-center items-center">
              <li
                onClick={() => setTab("description")}
                className={`font-bold text-lg text-primary border border-primary p-3 rounded-md
                ${tab === "description" ? "bg-primary text-white" : ""}
                hover:bg-primary hover:text-white cursor-pointer`}
              >
                Description
              </li>
              <li
                onClick={() => setTab("bids")}
                className={`font-bold text-lg text-primary border border-primary p-3 rounded-md
                ${tab === "bids" ? "bg-primary text-white" : ""}
                hover:bg-primary hover:text-white cursor-pointer`}
              >
                Bids
              </li>
              <li
                onClick={() => setTab("comments")}
                className={`font-bold text-lg text-primary border border-primary p-3 rounded-md
                 ${tab === "comments" ? "bg-primary text-white" : ""}
                 hover:bg-primary hover:text-white cursor-pointer`}
              >
                Comments
              </li>
            </ul>
            {tab === "description" && (
              <div className="p-5">
                <p className="text-lg font-bold">{item.description}</p>
              </div>
            )}

            {tab === "bids" && (
              <div className="p-5">
                <p className="text-lg font-bold">No bids yet</p>
              </div>
            )}
            {tab === "comments" && (
              <div className="p-5">
                <p className="text-lg font-bold">No comments yet</p>
              </div>
            )}
          </div>
        </div>
      )}
      {showBidPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className=" p-10 rounded-lg border border-text2 shadow-sm">
            <h2 className="text-lg font-bold mb-2">Place your bid</h2>
            <input
              type="number"
              value={item.starting_price}
              onChange={(e) => setBid(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-400"
            />
            <button
              onClick={placeBid}
              className="bg-primary text-white p-2 rounded-lg w-full"
            >
              Bid
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
