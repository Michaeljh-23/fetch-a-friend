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
        <label for="customRange2" class="form-label">
          Example range
        </label>
        <input
          type="range"
          class="form-range"
          min="0"
          max="30"
          id="minAge"
          onChange={handleMinChange}
          value={ageRange.min}
        />
        <label for="customRange2" class="form-label">
          Max range
        </label>
        <input
          type="range"
          class="form-range"
          min="0"
          max="30"
          id="minAge"
          onChange={handleMaxChange}
          value={ageRange.max}
        />
      </div>
    </div>
  );
};

export default AgeSlider;
