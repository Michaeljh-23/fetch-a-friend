const LocationInput = ({
  location,
  setLocation,
  locationError,
  setZipCodes,
}) => {
  const stateCodes = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      setLocation({ ...location, city: value });
    } else {
      setLocation({ ...location, city: "" });
    }
  };
  return (
    <div id="location-input">
      <h3>Location</h3>
      <div className="location-input-group">
        <div className="loc-input">
          <label>City:</label>
          <input
            type="text"
            value={location.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>

        <div className="loc-input">
          <label>State:</label>

          <select
            onChange={(e) =>
              e.target.value !== "none"
                ? setLocation({ ...location, states: [e.target.value] })
                : setLocation({ ...location, states: null })
            }
            className="state-select"
          >
            <option value="none">None</option>
            {stateCodes.map((code) => {
              return (
                <option key={code} value={code}>
                  {code}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="location-error">
        <p>{locationError}</p>
      </div>
    </div>
  );
};

export default LocationInput;
