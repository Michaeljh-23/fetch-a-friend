import DogCard from "./DogCard.jsx";
import NoneFound from "./NoneFound.jsx";
const DogList = ({ dogs, setFavoriteDogList }) => {
  if (dogs.length === 0) return <NoneFound />;
  return (
    <div id="dog-content-section">
      {dogs.map((pup, i) => {
        return (
          <div key={i}>
            <DogCard pup={pup} setFavoriteDogList={setFavoriteDogList} />
          </div>
        );
      })}
    </div>
  );
};
export default DogList;
