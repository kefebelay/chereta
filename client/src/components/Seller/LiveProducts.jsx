import { useContext, useEffect, useState } from "react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../common/Pagination";
import Api from "../../pages/Auth/Axios";
import { UsersContext } from "../../hooks/Users_Hook";

export default function Products() {
  const { user } = useContext(UsersContext);
  const [products, setProducts] = useState([]);
  const ITEMS_PER_PAGE = 7;

  async function getProducts() {
    const id = await user.id;
    try {
      const response = await Api.get(`/api/my-listings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(
        response.data.filter((product) => product.status === "active")
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user) {
      getProducts();
    }
  }, [user]);

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(products, ITEMS_PER_PAGE);

  return (
    <div>
      <h1>Products</h1>
      {!products ? (
        <h1>Loading...</h1>
      ) : (
        <table className="w-full border border-text2">
          <thead>
            <tr className="border-b-2 border-text2">
              <th className="bg-background2 p-3">Id</th>
              <th className="bg-background2 p-3">title</th>
              <th className="bg-background2 p-3">Category</th>
              <th className="bg-background2 p-3">Price</th>
              <th className="bg-background2 p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((p) => (
              <tr
                key={p.id}
                className="border-b border-text2 hover:border-b-primary hover:border-b-4 transition-transform duration-300"
              >
                <td className="py-2 text-center">{p.id}</td>
                <td className="py-2 text-center">{p.title}</td>
                <td className="py-2 text-center">{p.category.name}</td>
                <td className="py-2 text-center">{p.starting_price}</td>
                <td className={`py-2 text-center ${"text-red-500"}`}>
                  {p.status}
                </td>
                <td className="py-2 text-center text-primary"></td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
