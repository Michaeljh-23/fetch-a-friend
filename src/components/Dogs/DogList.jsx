import DogCard from "./DogCard.jsx";
const DogList = ({ dogs }) => {
  return (
    <div id="dog-content-section">
      {dogs.map((pup) => {
        return <DogCard pup={pup} />;
      })}
    </div>
  );
};
export default DogList;
