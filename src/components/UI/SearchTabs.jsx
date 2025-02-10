const SearchTabs = ({ currentTab, handleTabChange, matchedDog }) => {
  const tabs = ["All Dogs", "Favorites", "My Match"];

  return (
    <div className="tab-group">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab ${currentTab === index ? "active" : ""}`}
          onClick={() => handleTabChange(index)}
          disabled={index === 2 && matchedDog === null}
        >
          <div role="button" className="tab-text">
            {tab}
          </div>
        </button>
      ))}
    </div>
  );
};
export default SearchTabs;
