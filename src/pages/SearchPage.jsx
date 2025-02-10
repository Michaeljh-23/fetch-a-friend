import FilterForm from "../components/Search/FilterForm.jsx";
import DogList from "../components/Dogs/DogList.jsx";
import SortOptions from "../components/UI/SortOptions.jsx";
import Loading from "../components/UI/Loading.jsx";
import StarFavoriteSVG from "../Icons/StarFavoriteSVG.jsx";
import useDogData from "../hooks/useDogData.js";
import SearchTabs from "../components/UI/SearchTabs.jsx";
import { useState } from "react";
import FavoritesList from "../components/Dogs/FavoritesList.jsx";
import DogCard from "../components/Dogs/DogCard.jsx";

const SearchPage = ({ authChecked }) => {
  const {
    allBreeds,
    dogs,
    total,
    setZipCodes,
    locationError,
    loading,
    fetchDogs,
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
    handleSortChange,
    handleFindMatch,
    matchedDog,
    currentTab,
    setCurrentTab,
    favoriteDogs,
    fetchFavorites,
  } = useDogData(authChecked);

  const handleFavoriteToggle = (dogId) => {
    setFavoriteDogIds((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId]
    );
  };

  const filteredDogs =
    currentTab === 1
      ? dogs.filter((dog) => favoriteDogIds.includes(dog.id))
      : dogs;

  const handleNextPage = () => {
    setFilter((prev) => ({ ...prev, from: prev.from + 24 }));
  };

  const handlePrevPage = () => {
    setFilter((prev) => ({ ...prev, from: Math.max(0, prev.from - 24) }));
  };

  const handleTabChange = (newTab) => {
    setFilter((prev) => ({ ...prev, from: 0 }));
    setCurrentTab(newTab);
  };

  if (loading) {
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
      <SearchTabs currentTab={currentTab} handleTabChange={handleTabChange} />
      {currentTab === 0 && (
        <div>
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
            handleSortChange={handleSortChange}
          />
          <SortOptions sort={sort} handleSortChange={handleSortChange} />
          <DogList
            dogs={dogs || []}
            handleFavoriteToggle={handleFavoriteToggle}
            favoriteDogIds={favoriteDogIds}
            setFavoriteDogIds={setFavoriteDogIds}
          />
        </div>
      )}
      {currentTab === 1 && (
        <FavoritesList
          dogs={dogs || []}
          favoriteDogs={favoriteDogs}
          favoriteDogIds={favoriteDogIds}
          handleFavoriteToggle={handleFavoriteToggle}
          handleFindMatch={handleFindMatch}
          fetchFavorites={fetchFavorites}
        />
      )}
      {currentTab === 2 && matchedDog && (
        <div className="match-container">
          <h2>Your Perfect Match!</h2>
          <DogCard
            pup={matchedDog}
            isFavorite={favoriteDogIds.includes(matchedDog.id)}
            handleFavoriteToggle={handleFavoriteToggle}
          />
        </div>
      )}
      {currentTab !== 2 && (
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
      )}
    </div>
  );
};

export default SearchPage;
