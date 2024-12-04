import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DisableBackButton() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(1);
    };

    window.addEventListener("popstate", handleBackButton);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
}
