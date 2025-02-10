import { useEffect, useState } from "react";
import NoneFound from "./NoneFound";
import { getLocationByZip } from "../../api/dogs.ts";
import Loading from "../UI/Loading";

const MatchSection = ({ matchedDog, favoriteDogs, handleFindMatch }) => {
  const [locationDetails, setLocationDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      if (matchedDog?.zip_code) {
        setLoading(true);
        const locationData = await getLocationByZip(matchedDog.zip_code);
        setLocationDetails(locationData[0]);
        setLoading(false);
      }
    };

    fetchLocation();
  }, [matchedDog]);

  console.log(locationDetails);
  if (matchedDog === null || matchedDog === undefined)
    return <NoneFound message="Something went wrong..." />;
  if (loading || locationDetails === null) return <Loading />;
  return (
    <div className="match-container">
      <h2>Your Perfect Match is {matchedDog.name}!</h2>
      <button
        onClick={() => {
          handleFindMatch(favoriteDogs);
        }}
        className="match-button rounded"
      >
        Try Again
      </button>
      <div className="match">
        <img src={matchedDog.img} />
        <div className="match-info">
          <h2>
            Hi! I'm <span>{matchedDog.name}</span>,{" "}
          </h2>
          <h2>
            I'm <span>{matchedDog.age}</span> year old{" "}
            <span>{matchedDog.breed}</span>
          </h2>
          <h2>
            You can find me in <span>{locationDetails.city}</span>,{" "}
            <span>
              {locationDetails.state} {matchedDog.zip_code}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MatchSection;
