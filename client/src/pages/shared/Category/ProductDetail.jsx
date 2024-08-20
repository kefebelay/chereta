import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";

export default function Item() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [bid, setBid] = useState(0);
  const [showBidPopup, setShowBidPopup] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  function onBid() {
    setShowBidPopup(true);
  }

  function placeBid() {
    // Call API to place bid
    console.log("Bid placed: ", bid);
    setShowBidPopup(false);
  }

  useEffect(() => {
    async function getItems() {
      try {
        setisLoading(true);
        const items = await Axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
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
        <div className="flex md:flex-row-reverse flex-col-reverse px-10 mt-20 gap-3">
          <div className="text-center md:flex-1">
            <div className="w-auto">
              <h1 className="m-5 font-extrabold lg:text-4xl text-2xl text-primary hidden md:block">
                {item.title}
              </h1>
              <p className="py-6 mb-4 text-text2 text-left">
                {item.description}
              </p>
              <div className=" bg-background2  p-2  mb-4">
                <p className=" font-bold bg-transparent">
                  Starting price:
                  <span className=" text-birr text-xl bg-transparent">
                    {" "}
                    Birr {item.price * 74}
                  </span>
                </p>
              </div>
              <div className=" bg-accent brightness-90  p-2">
                <p className=" font-bold bg-transparent text-white">
                  Highest bid:
                  <span className=" text-white text-xl bg-transparent">
                    {" "}
                    Birr {item.price * 74}
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

            <div className=" md:h-[35rem] md:flex-1 flex justify-center p-4">
              <img
                src={item.images}
                className="h-full w-full pb-1 rounded-lg hover:scale-105 transition-transform duration-300 "
              />
            </div>
          </div>
        </div>
      )}
      {showBidPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className=" p-10 rounded-lg border border-text2 shadow-sm">
            <h2 className="text-lg font-bold mb-2">Place your bid</h2>
            <input
              type="number"
              value={item.price * 74}
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
