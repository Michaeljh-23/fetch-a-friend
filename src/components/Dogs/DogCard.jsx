import StarFavoriteSVG from "../../Icons/StarFavoriteSVG";

const DogCard = ({ pup, setFavoriteDogList }) => {
  return (
    <div className="dog-card">
      <img src={pup.img} alt={pup.name} className="dog-image" />
      <div className="dog-details">
        {/* <div className="favorites-star">
          <StarFavoriteSVG />
        </div> */}
        <div className="dog-name">
          <h3>{pup.name}</h3>{" "}
          <StarFavoriteSVG setFavoriteDogList={setFavoriteDogList} />
        </div>
        <p>Age: {pup.age}</p>
        <p>Breed: {pup.breed}</p>
        <p>Zip Code: {pup.zip_code}</p>
      </div>
    </div>
  );
};

export default DogCard;
