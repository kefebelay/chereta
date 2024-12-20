import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UsersProvider from "./hooks/Users_Hook.jsx";
import AdminProvider from "./hooks/Admin_Hooks.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsersProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </UsersProvider>
  </React.StrictMode>
);
