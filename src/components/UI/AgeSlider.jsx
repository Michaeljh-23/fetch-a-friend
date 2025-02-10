const AgeSlider = ({ ageRange, setAgeRange }) => {
  const handleMinChange = (e) => {
    const newMin = Number(e.target.value);
    if (newMin <= ageRange.max) {
      setAgeRange((prev) => ({ ...prev, min: newMin }));
    }
  };
  const handleMaxChange = (e) => {
    const newMax = Number(e.target.value);
    if (newMax >= ageRange.min) {
      setAgeRange((prev) => ({ ...prev, max: newMax }));
    }
  };

  return (
    <div className="age-slider">
      <h3>Age</h3>
      <label>
        Age Range: {ageRange.min} - {ageRange.max}
      </label>
      <div className="age-range">
        <div>
          <label htmlFor="minAge" className="form-label">
            Minimum Age
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="20"
            id="minAge"
            onChange={handleMinChange}
            value={ageRange.min}
          />
        </div>
        <div>
          <label htmlFor="maxAge" className="form-label">
            Maximum Age
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="20"
            id="minAge"
            onChange={handleMaxChange}
            value={ageRange.max}
          />
        </div>
      </div>
    </div>
  );
};

export default AgeSlider;
