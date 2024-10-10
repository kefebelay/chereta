import { createContext, useState } from "react";

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [userCount, setUserCount] = useState({} || null);
  const [rolesCount, setrolesCount] = useState({} || null);
  return (
    <AdminContext.Provider
      value={{ userCount, setUserCount, rolesCount, setrolesCount }}
    >
      {children}
    </AdminContext.Provider>
  );
}
