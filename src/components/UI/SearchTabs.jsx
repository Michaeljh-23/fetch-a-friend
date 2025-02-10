const SearchTabs = ({ currentTab, handleTabChange }) => {
  const tabs = ["All Dogs", "Favorites", "My Match"];

  return (
    <div className="tab-group">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${currentTab === index ? "active" : ""}`}
          onClick={() => handleTabChange(index)}
        >
          <p role="button" className="tab-text">
            {tab}
          </p>
        </div>
      ))}
    </div>
  );
};
export default SearchTabs;
