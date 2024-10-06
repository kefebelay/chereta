import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UsersProvider from "./hooks/Users_Hook.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsersProvider user={null}>
      <App />
    </UsersProvider>
  </React.StrictMode>
);
