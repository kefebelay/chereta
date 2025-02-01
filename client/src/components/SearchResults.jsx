import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchResults = async (query) => {
    try {
      const response = await fetch(`/api/listing/search?query=${query}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      fetchResults(query);
    }
  }, [location.search]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
