import "./index.css";
import Routes from "./routes";
import ThemeSwitcher from "./components/common/ThemeSwitcherBtn";
import { useEffect } from "react";
import Api from "./pages/Auth/Axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      await Api.get("/sanctum/csrf-cookie");
    };

    fetchCsrfToken();
  }, []);
  return (
    <div>
      <div className="hidden">
        <ThemeSwitcher />
      </div>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={localStorage.getItem("theme")}
        transition:Bounce
      />
    </div>
  );
}

export default App;
