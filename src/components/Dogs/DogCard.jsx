const DogCard = ({ pup }) => {
  return (
    <div className="dog-card">
      <img src={pup.img} alt={pup.name} className="dog-image" />
      <div className="dog-details">
        <h3>{pup.name}</h3>
        <p>Breed: {pup.breed}</p>
        <p>Age: {pup.age}</p>
        <p>Zip Code: {pup.zip_code}</p>
      </div>
    </div>
  );
};

export default DogCard;
