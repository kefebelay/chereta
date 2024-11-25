import CategoriesCard from "./CategoriesCard";
import Navbar from "../../../components/common/Navbar";

export default function Categories() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-28 text-primary">
        Categories
      </h1>

      <div className="p-3">
        <CategoriesCard />
      </div>
    </div>
  );
}
