/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../../pages/Auth/Axios";
import { toast } from "react-toastify";
import { AiOutlineHeart } from "react-icons/ai";
import Cookies from "js-cookie";
import { FcLike } from "react-icons/fc";
export default function Favorites({ item }) {
  const { user, token } = useContext(UsersContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        try {
          const response = await Api.get(
            `/api/favorites/is-favorite/${item.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
              },
            }
          );
          setIsFavorite(response.data.isFavorite);
        } catch (err) {
          console.log(err);
        }
      }
    };
    checkFavorite();
  }, [item.id, user]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.info("You must be logged in to add to favorites.");
      return;
    }

    try {
      if (isFavorite) {
        await Api.delete(`/api/favorites/remove/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        });
        toast.success("Removed from favorites.");
      } else {
        await Api.post(
          `/api/favorites/add/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            },
          }
        );
        toast.success("Added to favorites.");
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <button onClick={toggleFavorite} className="text-2xl">
      {isFavorite ? <FcLike /> : <AiOutlineHeart className="text-primary" />}
    </button>
  );
}
