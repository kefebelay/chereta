import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../pages/Auth/Axios";

export default function BidsTab() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getItems() {
      try {
        const items = await Api.get(`api/listing/bids/${id}`);
        setItem(items.data);
        console.log(items.data.bid);
      } catch (err) {
        console.log(err);
      }
    }
    getItems();
  }, [id]);

  return (
    <div>
      <div className="mt-5 px-10">
        {item.is_private ? (
          <p className="text-center text-red-600">This bid is private.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Bid Amount</th>
                <th className="border p-2">User</th>
              </tr>
            </thead>
            <tbody>
              {(item?.bid || []).map((bid, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">
                    {new Date(bid.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="border p-2">Birr {bid.bid_amount}</td>
                  <td className="border p-2">
                    {bid.user?.user_name || "Anonymous"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
