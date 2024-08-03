import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <aside className="bg-gray-100 p-4">
        <ul>
          <li>
            <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="block py-2 px-4 hover:bg-gray-200">
              Users
            </Link>
          </li>
          {/* Other navigation items */}
        </ul>
      </aside>
    </div>
  );
}
