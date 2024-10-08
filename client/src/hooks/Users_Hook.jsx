import { createContext, useEffect, useState } from "react";
import Api from "../pages/Auth/Axios";

export const UsersContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UsersProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  async function getUser() {
    const res = await Api.get("api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(res.data.user);
  }
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  return (
    <UsersContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UsersContext.Provider>
  );
}
