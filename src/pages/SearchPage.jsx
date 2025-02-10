import FilterForm from "../components/Search/FilterForm.jsx";
import DogList from "../components/Dogs/DogList.jsx";
import SortOptions from "../components/UI/SortOptions.jsx";
import Loading from "../components/UI/Loading.jsx";
import StarFavoriteSVG from "../Icons/StarFavoriteSVG.jsx";
import useDogData from "../hooks/useDogData.js";

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
    favoriteDogList,
    setFavoriteDogList,
    sort,
    setSort,
    handleSortChange,
  } = useDogData(authChecked);

  const handleNextPage = () => {
    setFilter((prev) => ({ ...prev, from: prev.from + 24 }));
  };

  const handlePrevPage = () => {
    setFilter((prev) => ({ ...prev, from: Math.max(0, prev.from - 24) }));
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
      <StarFavoriteSVG />
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

      <DogList dogs={dogs || []} setFavoriteDogList={setFavoriteDogList} />
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
