import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import DogCard from "./DogCard";
import NoneFound from "./NoneFound";
import { getDogsByIds } from "../../api/dogs.ts";

const FavoritesList = ({
  favoriteDogIds,
  handleFavoriteToggle,
  handleFindMatch,
  fetchFavorites,
  loading,
  favoriteDogs,
}) => {
  useEffect(() => {
    console.log(favoriteDogIds, "whammy");
    fetchFavorites();
  }, [favoriteDogIds.length]);

  if (loading) return <Loading />;
  if (favoriteDogs.length === 0)
    return <NoneFound message="No favorites yet!" />;

  return (
    <>
      <div className="favorites-bar">
        {favoriteDogs.length > 2 && (
          <h3>
            You're so close to finding the newest member of the family! Need
            some help narrowing it down?
          </h3>
        )}
        <button
          onClick={() => {
            handleFindMatch(favoriteDogs);
          }}
          className="match-button rounded"
        >
          Find my Match!
        </button>
      </div>
      <div id="dog-content-section">
        {favoriteDogs.map((pup) => (
          <DogCard
            key={pup.id}
            pup={pup}
            isFavorite={true} // Always true since we're in the favorites tab
            handleFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </>
  );
};

export default FavoritesList;
