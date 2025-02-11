import { useState, useEffect } from "react";
import {
  getBreeds,
  getZipCodes,
  getDogMatches,
  getDogsByIds,
  getFavoriteMatch,
} from "../api/dogs.ts";

const useDogData = (authChecked) => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [dogs, setDogs] = useState(null);
  const [total, setTotal] = useState(0);
  const [zipCodes, setZipCodes] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ city: "", states: null });
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [ageRange, setAgeRange] = useState({ min: 0, max: 20 });
  const [favoriteDogIds, setFavoriteDogIds] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState([]); // arr of full dog obj

  const [sort, setSort] = useState({ field: "breed", order: "asc" });
  const [sortLoading, setSortLoading] = useState(false);
  const [matchedDog, setMatchedDog] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const [filter, setFilter] = useState({
    zipCodes: null,
    ageMin: 0,
    ageMax: 20,
    size: 24,
    from: 0,
    breeds: null,
    sort: "breed:asc",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const breeds = await getBreeds();
      setAllBreeds(breeds);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    } finally {
      setLoading(false);
    }
  };

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
      const dogsResults = await getDogsByIds(dogsResponse.resultIds);

      setDogs(dogsResults);
      setTotal(dogsResponse.total || 0);
      setLoading(false);
      setSortLoading(false);
    } catch (err) {
      console.error("Error fetching dogs:", err);
      setDogs([]);
    }
  };
  const handleSortChange = (field, order) => {
    setSort({ field, order });
    setFilter((prev) => ({ ...prev, sort: `${field}:${order}` }));
    setSortLoading(true);
  };

  useEffect(() => {
    if (allBreeds.length > 0) {
      fetchDogs();
    }
  }, [allBreeds, filter.from, filter.breeds, filter.sort]);

  useEffect(() => {
    if (authChecked) {
      // TODO Improve this - shouldnt need timeout. Redirect from login to search causes an error.
      setTimeout(() => {
        fetchData().finally(() => setLoading(false));
      }, 2000);
      setLoading(true);
    }
  }, [authChecked]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      breeds: selectedBreeds.length === 0 ? null : selectedBreeds,
      zipCodes: zipCodes.length !== 0 ? zipCodes : null,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
    }));
  }, [zipCodes, ageRange, selectedBreeds]);

  const fetchFavorites = async () => {
    if (favoriteDogIds.length === 0) {
      setFavoriteDogs([]);
    }
    try {
      const dogs = await getDogsByIds(favoriteDogIds);
      setFavoriteDogs(dogs);
      setFavoriteDogIds(dogs.map((dog) => dog.id));
    } catch (error) {
      setLoading(false);
      console.error("Error fetching favorite dogs:", error);
    }
  };

  const handleFindMatch = async () => {
    try {
      const favoriteDogIds = favoriteDogs.map((dog) => dog.id);
      const matchId = await getFavoriteMatch(favoriteDogIds);
      const matchedDog = await getDogsByIds([matchId.match]);
      setMatchedDog(matchedDog[0]);
      setCurrentTab(2);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    allBreeds,
    handleFindMatch,
    setAllBreeds,
    dogs,
    setDogs,
    total,
    setTotal,
    zipCodes,
    setZipCodes,
    locationError,
    setLocationError,
    loading,
    setLoading,
    fetchDogs,
    fetchData,
    fetchFavorites,
    filter,
    setFilter,
    location,
    setLocation,
    selectedBreeds,
    setSelectedBreeds,
    ageRange,
    setAgeRange,
    favoriteDogIds,
    setFavoriteDogIds,
    sort,
    setSort,
    currentTab,
    setCurrentTab,
    handleSortChange,
    matchedDog,
    setMatchedDog,
    favoriteDogs,
    setFavoriteDogs,
    sortLoading,
    setSortLoading,
  };
};

export default useDogData;
