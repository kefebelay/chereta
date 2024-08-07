// src/pages/SellerInfo.jsx
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import Navbar from "../../components/common/Navbar";
import VerifiedBadge from "../../components/Seller/VerifiedBadge";

export default function SellerInfo() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function get() {
      try {
        setIsLoading(true);

        const profileResponse = await Axios.get(
          `https://randomuser.me/api/?id=${id}`
        );
        setProfile(profileResponse.data.results[0]);

        const itemsResponse = await Axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        const fewItems = itemsResponse.data.slice(0, 4);
        setItems(fewItems);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    get();
  }, [id]);

  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center">
        <Loading />
      </div>
    );
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  const description =
    "Experienced individual seller specializing in high-quality products. Dedicated to providing excellent customer service and competitive prices.";

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 p-4">
        <div className="shadow-text2 shadow-md rounded-lg p-8 text-center">
          <img
            className="w-40 mx-auto rounded-full border-4 shadow-primary"
            src={profile.picture.large}
            alt="Seller"
          />
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold mt-4">
              {profile.name.first} {profile.name.last}
            </h2>{" "}
            <VerifiedBadge isVerified={profile.registered.age > 1} />
          </div>
          <p className="text-text2">{profile.email}</p>
          <p className="text-text p-6 bg-transparent text-start">
            {description}
          </p>
          <div className="flex justify-center items-center mt-2"></div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Ongoing Auctions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="bg-transparent shadow-text2 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 hover:scale-105 hover:duration-700"
                >
                  <img
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    src={item.images[0]}
                    alt="Product"
                  />
                  <h4 className="text-lg font-bold text-text2 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-birr font-semibold">
                    Birr: {item.price * 74}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
