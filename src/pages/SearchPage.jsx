import {
  getBreeds,
  getZipCodes,
  getDogMatches,
  getDogsByIds,
  getDogMatchByIds,
} from "../api/dogs.ts";
import FilterForm from "../components/Search/FilterForm.jsx";
import DogList from "../components/Dogs/DogList.jsx";
import { useEffect, useState } from "react";
import SortOptions from "../components/UI/SortOptions.jsx";
import Loading from "../components/UI/Loading.jsx";

const SearchPage = ({ authChecked }) => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [ageRange, setAgeRange] = useState({ min: 0, max: 20 });
  const [location, setLocation] = useState({ city: "", states: null });
  const [zipCodes, setZipCodes] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [dogs, setDogs] = useState(null);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState({ field: "breed", order: "asc" });
  const [loading, setLoading] = useState(false);
  const [exactMatch, setExactMatch] = useState(false);
  const [filter, setFilter] = useState({
    zipCodes: null,
    ageMin: 0,
    ageMax: 20,
    size: 24,
    from: 0,
    breeds: null,
    sort: "breed:desc",
  });

  const fetchData = async () => {
    const breeds = await getBreeds();
    setAllBreeds(breeds);
  };
  console.log(exactMatch);
  const fetchDogs = async () => {
    let updatedFilter;
    if (location.city.trim().length !== 0 || location.states !== null) {
      const zipcodesResponse = await getZipCodes(location);
      const zipCodesResultsArray =
        zipcodesResponse?.results?.map(
          (locationData) => locationData.zip_code
        ) || [];
      setZipCodes(zipCodesResultsArray);

      if (zipcodesResponse?.total === 0) {
        setLocationError(
          "We are having a hard time finding this location, searching USA for your match!"
        );
      } else {
        setLocationError(null);
      }

      updatedFilter = {
        ...filter,
        zipCodes: zipCodesResultsArray.length > 0 ? zipCodesResultsArray : null,
      };
    } else if (location.states === null) {
      setZipCodes([]);
      updatedFilter = {
        ...filter,
        zipCodes: null,
      };
    } else {
      updatedFilter = filter;
    }

    try {
      const dogsResponse = await getDogMatches(updatedFilter);

      if (!dogsResponse || !dogsResponse.resultIds) {
        console.warn(
          "No dogs found or invalid response structure:",
          dogsResponse
        );
        setDogs([]);
        return;
      }
      let dogsResults;
      if (exactMatch) {
        console.log("WHAMMY", exactMatch);
        dogsResults = await getDogMatchByIds(dogsResponse.resultIds);
        setExactMatch(false);
      } else {
        dogsResults = await getDogsByIds(dogsResponse.resultIds);
        console.log("gangster", exactMatch);
      }
      console.log(dogsResults, "results");
      setDogs(dogsResults);
      setTotal(dogsResponse.total || 0);
    } catch (err) {
      console.error("Error fetching dogs:", err);
      setDogs([]);
    }
  };

  const handleNextPage = () => {
    setFilter((prev) => ({ ...prev, from: prev.from + 24 }));
  };

  const handlePrevPage = () => {
    setFilter((prev) => ({ ...prev, from: Math.max(0, prev.from - 24) }));
  };

  const handleSortChange = (field, order) => {
    setSort({ field, order });
    setFilter((prev) => ({ ...prev, sort: `${field}:${order}` }));
  };

  useEffect(() => {
    if (authChecked) {
      // TODO Improve this - shouldnt need timeout. Redirect from login to search causes an error.
      setTimeout(() => {
        fetchData().finally(() => setLoading(false));
      }, 2000);
    }
  }, [authChecked]);

  useEffect(() => {
    fetchDogs();
  }, [allBreeds, filter.from, filter.breeds, filter.sort]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      breeds: selectedBreeds.length === 0 ? null : selectedBreeds,
      zipCodes: zipCodes.length !== 0 ? zipCodes : null,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
    }));
  }, [selectedBreeds, zipCodes, ageRange]);

  if (!allBreeds) {
    return <Loading />;
  }

  return (
    <div id="search-page">
      <img
        src="puppies-banner-stock-top.jpg"
        alt="three puppies banner"
        className="rounded"
      />
      <h1>Search</h1>
      <FilterForm
        allBreeds={allBreeds}
        selectedBreeds={selectedBreeds}
        setSelectedBreeds={setSelectedBreeds}
        filter={filter}
        setFilter={setFilter}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
        location={location}
        setLocation={setLocation}
        fetchDogs={fetchDogs}
        setZipCodes={setZipCodes}
        locationError={locationError}
        sort={sort}
        setExactMatch={setExactMatch}
        handleSortChange={handleSortChange}
      />
      <SortOptions sort={sort} handleSortChange={handleSortChange} />

      <DogList dogs={dogs || []} />
      <div className="page-btn-group">
        <button onClick={handlePrevPage} disabled={filter.from === 0}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={filter.from + 24 >= total + (24 - (total % 24))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
