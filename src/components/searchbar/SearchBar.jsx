import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './SearchBar.css'; // Import the CSS file

const SearchBar = () => {
  const [userInput, setUserInput] = useState("");
  const [countryDetails, setCountryDetails] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (userInput.trim() === "") {
        setCountryDetails([]);
        return;
      }

      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${userInput}`);
        
        if (!response.ok) {
          throw new Error("Countries not found");
        }

        const data = await response.json();
        setCountryDetails(data.slice(0, 10)); // Limit results to first 10
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
        setCountryDetails([]); // Clear previous results
      }
    };

    fetchCountryDetails();
  }, [userInput]);

  return (
    <div className="searchbar-parent">
      <div className="search-bar-container">
        <input
          type="text"
          value={userInput}
          onChange={handleSearch}
          placeholder="Enter country or capital name"
          className="search-input"
        />
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      {countryDetails.length > 0 && (
        <ul className="country-list">
          {countryDetails.map((country) => (
            <li key={country.cca3} className="country-list-item">
              {/* <Link to={`/country/${country.name.common}`}>
              </Link> */}
              <img src={country.flags.png} alt="Country-flag" className="country-img"/>
                <p className="country-name">{country.name.common} - {country.capital ? country.capital[0] : "No capital"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
