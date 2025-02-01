import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    const fetchResults = async () => {
      const response = await fetch(`/api/listing/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    };
    fetchResults();
  }, [location.search]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 mt-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id} className="mb-2">
                <a href={`/listing/${result.id}`} className="text-blue-500">
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
