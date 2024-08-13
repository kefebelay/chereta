import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";

export default function Item() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  function onBid() {
    alert("Bid placed successfully");
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
        <div className="flex md:flex-row-reverse flex-col-reverse p-10 mt-14">
          <div className="text-center ">
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
            <div className=" h-1/6 p-7">
              <div className=" md:h-[35rem] w-full flex justify-center p-4">
                <img
                  src={item.images}
                  className="h-full pb-1 rounded-lg hover:scale-105 transition-transform duration-300 "
                />
              </div>
              <div className=" flex w-full h-full gap-2 px-4 md:px-24">
                {item.images.map((item) => (
                  <img
                    className="w-full h-full rounded-lg hover:scale-105 transition-transform duration-300"
                    src={item}
                    key={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
