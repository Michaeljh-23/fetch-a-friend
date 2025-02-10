import AgeSlider from "../UI/AgeSlider.jsx";
import BreedsList from "../UI/BreedsList.jsx";
import LocationInput from "../UI/LocationInput.jsx";
import { useState } from "react";
const FilterForm = ({
  allBreeds,
  filter,
  setFilter,
  ageRange,
  setAgeRange,
  selectedBreeds,
  setSelectedBreeds,
  handleFilterChange,
  location,
  fetchDogs,
  setLocation,
  setZipCodes,
  locationError,
  setExactMatch,
}) => {
  const [showAllBreeds, setShowAllBreeds] = useState(false);

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Search Filters
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="filter-form">
              <div className="filter-form-split">
                <AgeSlider ageRange={ageRange} setAgeRange={setAgeRange} />
                <LocationInput
                  location={location}
                  setLocation={setLocation}
                  setZipCodes={setZipCodes}
                  locationError={locationError}
                />
                {/* This got large, seperate compoonent */}
                <div className="find-my-section">
                  <h3>Summary</h3>

                  <div className="filter-summary">
                    <ul>
                      {Object.entries(filter).map(([key, value]) => {
                        if (
                          value === null ||
                          value === "" ||
                          key === "zipCodes" ||
                          key === "size" ||
                          key === "from" ||
                          key === "sort" ||
                          key === "breeds"
                        )
                          return null;

                        return (
                          <li key={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1) + ": "}
                            {Array.isArray(value) ? (
                              <ul>
                                {value
                                  .slice(0, showAllBreeds ? value.length : 3)
                                  .map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                {value.length > 3 && (
                                  <li>
                                    <p
                                      onClick={() =>
                                        setShowAllBreeds(!showAllBreeds)
                                      }
                                      role="button"
                                      className="show-button"
                                    >
                                      {showAllBreeds ? "Hide" : "Show All"}
                                    </p>
                                  </li>
                                )}
                              </ul>
                            ) : (
                              value
                            )}
                          </li>
                        );
                      })}
                      {location &&
                      (location.city !== "" || location.states !== null) ? (
                        <li>
                          Location:{" "}
                          {(location.city !== "" ||
                            location.states !== null) && (
                            <span>
                              <span> {location.city}</span>
                              {location.city !== "" &&
                                location.states !== null && <span>,</span>}{" "}
                              {Array.isArray(location.states) &&
                                location.states.map((state, index) => (
                                  <span key={index}> {state}</span>
                                ))}
                            </span>
                          )}
                          {/* ^^ failsafe, */}
                        </li>
                      ) : (
                        <li>Location: Anywhere!</li>
                      )}
                    </ul>
                  </div>
                  <button onClick={fetchDogs} className="match-button rounded">
                    Search Dogs
                  </button>
                  <button
                    onClick={() => {
                      setExactMatch(true);
                      fetchDogs();
                    }}
                    className="match-button rounded"
                  >
                    Find my Match!
                  </button>
                </div>
              </div>
              <BreedsList
                allBreeds={allBreeds}
                handleFilterChange={handleFilterChange}
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
                filter={filter}
                fetchDogs={fetchDogs}
                setFilter={setFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterForm;
