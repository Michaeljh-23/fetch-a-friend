const LocationInput = ({ location, setLocation }) => {
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
    }
  };

  return (
    <div id="location-input">
      <h3>Location</h3>
      <div className="location-input-group">
        <input
          type="text"
          value={location.city}
          onChange={handleChange}
          placeholder="City"
        />
        <select
          onChange={(e) =>
            setLocation({ ...location, states: [e.target.value] })
          }
        >
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
  );
};

export default LocationInput;
