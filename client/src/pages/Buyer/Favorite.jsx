import { useContext, useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { Sidebar } from "../../components/Buyer/Sidebar";
import { TiEyeOutline } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Api from "../../pages/Auth/Axios";
import { UsersContext } from "../../hooks/Users_Hook";
import Cookies from "js-cookie";

export default function Favorites() {
  const { token } = useContext(UsersContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await Api.get("/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        });
        setFavorites(response.data.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (id) => {
    try {
      await Api.delete(`/api/favorites/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      setFavorites(favorites.filter((favorite) => favorite.listing_id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-20">
      <Navbar />
      <div className="flex gap-5">
        <Sidebar />
        <div>
          <section className="shadow-s1 p-8 rounded-lg">
            <div className="text-center text-xs text-gray-700 uppercase w-full">
              Favorites
            </div>
            <hr className="my-5" />
            <br />
            <div className="relative overflow-x-auto rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-5">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Listing ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price (BIRR)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map((favorite) => (
                    <tr
                      key={favorite.listing_id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{favorite.listing.title}</td>
                      <td className="px-6 py-4">{favorite.listing_id}</td>
                      <td className="px-6 py-4">
                        {favorite.listing.starting_price}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          className="w-10 h-10"
                          src={favorite.listing.image}
                          alt="Listing Image"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 me-2"></div>
                          {favorite.listing.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center flex items-center gap-3 mt-1">
                        <NavLink
                          to={`/product/${favorite.listing_id}`}
                          className="font-medium text-blue-500"
                        >
                          <TiEyeOutline size={25} />
                        </NavLink>
                        <button
                          onClick={() =>
                            handleRemoveFavorite(favorite.listing_id)
                          }
                          className="font-medium text-red-500"
                        >
                          <MdOutlineDeleteOutline size={25} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
