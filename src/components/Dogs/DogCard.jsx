const DogCard = ({ pup }) => {
  return (
    <div className="dog-card">
      <div>
        <h3>{pup.name}</h3>
      </div>
    </div>
  );
};
export default DogCard;
