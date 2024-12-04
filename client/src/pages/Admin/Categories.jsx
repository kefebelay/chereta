import { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Popup from "../../components/common/Popup";
import Api from "../Auth/Axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { UsersContext } from "../../hooks/Users_Hook";

export default function Categories() {
  const [Open, isOpen] = useState(true);
  const [popup, setPopup] = useState(false);
  const [change, setChange] = useState({ name: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(0);

  const { url } = useContext(UsersContext);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await Api.get("api/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, [update]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setChange({ ...change, [name]: value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  async function addCategory(e) {
    setMessage("");
    e.preventDefault();
    if ((!change.name, !image)) {
      setMessage("both Category name and image are required");
      return;
    }
    const formData = new FormData();
    formData.append("name", change.name);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await Api.post("api/category", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      toast.success("Category added successfully:", response.data);
      setChange({ name: "" });
      setImage(null);
      setPreview(null);
      setUpdate(update + 1);
    } catch (error) {
      setMessage(error.response.data.message);
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      await Api.delete(`api/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
        },
      });
      toast.success("Category deleted successfully");
      setCategories(Categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  }

  return (
    <div>
      {popup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-35"
          onClick={() => setPopup(!popup)}
        >
          <Popup
            popup={popup}
            setPopup={setPopup}
            onYes={handleDelete}
            message="Are you sure you want to delete this category?"
          />
        </div>
      )}
      <Dashboard isOpen={Open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          Open ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <h1 className="text-center mt-3 text-3xl font-bold text-primary">
          Category
        </h1>
        <div className="bg-transparent border border-text2 p-6 rounded-lg shadow-md my-5">
          <h3 className="text-xl font-bold mb-6 bg-transparent">
            Add Category
          </h3>
          <form onSubmit={addCategory}>
            <div className="mb-4">
              <label className="block text-sm font-bold">Category Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={change.name}
                className="shadow border border-text2 rounded w-fit py-2 px-3"
                placeholder="Enter Category name"
              />
            </div>
            <div className="mb-1">
              <label className="block text-sm font-bold">Category Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="shadow border border-text2 rounded w-fit py-2 px-3"
                accept="image/*"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
            <p className="text-red-500 text-sm">{message}</p>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary m-3 text-white hover:bg-blue-700 duration-300"
            >
              Add
            </button>
          </form>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Total Categories: {Categories.length || 0}
          </h2>
          <table className="min-w-full bg-white border border-text2 rounded-lg mb-5">
            <thead>
              <tr className="bg-gray-100 border-b border-text2">
                <th className="text-left py-2 px-4">Category Name</th>
                <th className="text-left py-2 px-4">Category Id</th>
                <th className="text-left py-2 px-4">Image</th>
                <th className="text-left py-2 px-4">Action</th>
              </tr>
            </thead>
            {Categories && (
              <tbody className="bg-transparent p-3">
                {Categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="bg-transparent hover:border-2 hover:border-text2 transition-transform duration-500 cursor-pointer mb-2"
                  >
                    <td className="py-2 px-4">{cat.name}</td>
                    <td className="py-2 px-4">{cat.id}</td>
                    <td>
                      <img
                        src={url + cat.image}
                        alt={cat.name}
                        className="w-16 h-16 object-cover rounded-md m-1"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-primary hover:bg-secondary text-white font-bold py-1 px-3 rounded"
                        onClick={() => {
                          setPopup(!popup);
                          setId(cat.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!Categories && (
            <p className="text-center mt-4">
              No Categories found. Please add some categories.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
