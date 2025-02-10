const SortOptions = ({ sort, handleSortChange }) => {
  return (
    <div className="sort-options">
      <label>Sort By: </label>
      <div className="sort-options-group">
        <select
          value={sort.field}
          onChange={(e) => handleSortChange(e.target.value, sort.order)}
        >
          <option value="breed">Breed</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
        <button
          onClick={() =>
            handleSortChange(sort.field, sort.order === "asc" ? "desc" : "asc")
          }
        >
          {sort.order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
    </div>
  );
};
export default SortOptions;
