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
        <div className="md:flex md:flex-row-reverse p-10 mt-14">
          <div className="text-center ">
            <div className="w-auto">
              <h1 className="m-5 font-extrabold lg:text-4xl text-2xl text-primary">
                {item.title}
              </h1>
              <p className="mx-10 mb-4 text-text2">{item.description}</p>
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
              <button className="btn bg-primary w-32 text-center mt-4 text-white font-bold">
                Bid
              </button>
            </div>
          </div>
          <div className=" h-2/5 p-7">
            <img
              src={item.images}
              className=" pb-1 rounded-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
            />
            <div className="h-44 flex w-full gap-1">
              {item.images.map((item) => (
                <img
                  className="w-full rounded-lg hover:scale-105 transition-transform duration-300"
                  src={item}
                  key={item}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
