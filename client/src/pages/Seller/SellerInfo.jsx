import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import Navbar from "../../components/common/Navbar";
import VerifiedBadge from "../../components/Seller/VerifiedBadge";
import Api from "../Auth/Axios";
import { UsersContext } from "../../hooks/Users_Hook";
import RemainingTime from "../../components/common/Remaining_time";
import Pagination from "../../components/common/Pagination";

export default function SellerInfo() {
  const { id } = useParams();
  const { url } = useContext(UsersContext);

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filteredItems = items.filter((item) => item.status === "active");
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    async function get() {
      try {
        setIsLoading(true);

        const profileResponse = await Api.get(`/api/seller/profile/${id}`);
        console.log(profileResponse);
        setProfile(profileResponse.data.seller);
        setItems(profileResponse.data.seller.listings);
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
      <div>
        <Navbar />
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (!profile) {
    <Navbar />;

    return <div>No profile found</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 p-4">
        <div className="shadow-text2 shadow-md rounded-lg md:p-8 text-center">
          <img
            className="w-40 mx-auto rounded-full border-4 shadow-primary"
            src={profile.image || "/assets/icons/profile.svg"}
            alt="Seller"
          />
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold mt-4">{profile.name}</h2>{" "}
            <VerifiedBadge isVerified={profile.actor.age > 1} />
          </div>
          <p className="text-text2">{profile.email}</p>
          <p className="text-text2 text-center">{profile.phone_number}</p>
          <p className="text-text bg-transparent text-center">
            {profile.actor.description}
          </p>
          <div className="flex justify-center items-center mt-2"></div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Ongoing Auctions</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-transparent shadow-text2 p-4 rounded-lg shadow hover:shadow-lg 
                  duration-500 hover:scale-105 transition-transform hover:duration-700"
                >
                  <Link key={item.id} to={`/product/${item.id}`} className="">
                    <img
                      className="w-auto h-auto object-cover rounded-lg mb-4"
                      src={url + item.image}
                      alt="Product"
                    />
                    <h4 className="text-lg font-bold text-text2 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-birr font-semibold">
                      Birr: {item.starting_price}
                    </p>
                    <p className="text-sm ">
                      <RemainingTime
                        bidEndTime={item.bid_end_time}
                        createdAt={item.createdAt}
                      />
                    </p>
                  </Link>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
