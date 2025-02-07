import AgeSlider from "../UI/AgeSlider.jsx";
import BreedsList from "../UI/BreedsList.jsx";
import LocationInput from "../UI/LocationInput.jsx";
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
}) => {
  return (
    // Bootstrap Accordion
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
                <LocationInput location={location} setLocation={setLocation} />
              </div>
              <BreedsList
                allBreeds={allBreeds}
                handleFilterChange={handleFilterChange}
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
                filter={filter}
                setFilter={setFilter}
              />
            </div>
            <button onClick={fetchDogs}>Find my Match!</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterForm;
