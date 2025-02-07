import {
  getBreeds,
  getZipCodes,
  getDogMatches,
  getDogsByIds,
} from "../api/dogs.ts";
import FilterForm from "../components/Search/FilterForm.jsx";
import DogList from "../components/Dogs/DogList.jsx";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [ageRange, setAgeRange] = useState({ min: 0, max: 30 });
  const [location, setLocation] = useState({ city: "", states: "" });
  const [zipCodes, setZipCodes] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [dogs, setDogs] = useState(null);
  const [filter, setFilter] = useState({
    breeds: null,
    zipCodes: null,
    ageMin: 0,
    ageMax: 30,
    size: null,
  });

  const fetchData = async () => {
    const breeds = await getBreeds();
    setAllBreeds(breeds);
  };
  const fetchDogs = async () => {
    let updatedFilter;
    if (
      location.city.trim().length !== 0 &&
      location.state.trim().length !== 0
    ) {
      const zipcodesResponse = await getZipCodes(location);
      const zipCodesResultsArray = zipcodesResponse.results.map(
        (locationData) => locationData.zip_code
      );
      setZipCodes(zipCodesResultsArray);
      if (zipcodesResponse.total === 0) {
        setLocationError("This location does not show any results");
      } else {
        setLocationError(null);
      }
      updatedFilter = {
        ...filter,
        zipCodes: zipCodesResultsArray.length > 0 ? zipCodesResultsArray : null,
      };
    } else {
      updatedFilter = filter;
    }
    // time to get the dogs
    const dogsIds = await getDogMatches(updatedFilter);
    const dogsResults = await getDogsByIds(dogsIds);
    setDogs(dogsResults);
    console.log(dogsIds, dogsResults, "DOGSSSSSS");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [allBreeds]);

  useEffect(() => {
    setFilter({
      breeds: selectedBreeds.length === 0 ? null : selectedBreeds,
      zipCodes: zipCodes.length !== 0 ? zipCodes : null,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
      size: null,
    });
  }, [selectedBreeds, zipCodes, ageRange]);

  if (!allBreeds) return <p>Loading...</p>;
  return (
    <div id="search-page">
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
      />
      <DogList dogs={dogs || []} />
    </div>
  );
};
export default SearchPage;
