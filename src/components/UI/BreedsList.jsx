import { useState, useEffect } from "react";

const BreedsList = ({
  allBreeds,
  selectedBreeds,
  setSelectedBreeds,
  setFilter,
}) => {
  let alphabetLetters = "abcdefghijklmnopqrstuvwxyz".split("");
  const [letterCategories, setLetterCategories] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [alphabet, setAlphabet] = useState([]);

  useEffect(() => {
    const updatedAlphabet = alphabetLetters.map((letter) => ({
      letter,
      disabled: !allBreeds.some((breed) =>
        breed.toLowerCase().startsWith(letter)
      ),
    }));
    setAlphabet(updatedAlphabet);
  }, [allBreeds]);

  const handleCheckboxChange = (item, group) => {
    let updatedItems;
    if (group.includes(item)) {
      updatedItems = group.filter((b) => b !== item);
    } else {
      updatedItems = [...group, item];
    }
    if (group === letterCategories) {
      setLetterCategories(updatedItems);
      const localFilteredBreeds = allBreeds.filter((breed) =>
        updatedItems.some((selectedLetter) =>
          breed.toLowerCase().startsWith(selectedLetter)
        )
      );
      setFilteredBreeds(localFilteredBreeds);
    } else {
      setSelectedBreeds(updatedItems);
      setFilter((prev) => ({ ...prev, from: 0 }));
    }
  };
  const isLetterInUnderlinedBreed = (letter) => {
    return selectedBreeds.some((breed) =>
      breed.toLowerCase().startsWith(letter)
    );
  };
  return (
    <div className="breeds-list">
      {/* Alphabet Checkboxes */}
      <h3>Breeds</h3>
      <div className="alphabet-filter">
        {alphabet.map((letterObj) => {
          const { letter, disabled } = letterObj;
          const isHighlighted = isLetterInUnderlinedBreed(letter);

          return (
            <label
              key={letter}
              className={`alphabet-item ${
                isHighlighted ? "highlight-letter" : ""
              }`}
            >
              <input
                type="checkbox"
                value={letter}
                checked={letterCategories.includes(letter)}
                onChange={() => handleCheckboxChange(letter, letterCategories)}
                disabled={disabled}
              />
              <span>{letter.toUpperCase()}</span>
            </label>
          );
        })}
        <label className="alphabet-item">
          <button
            value={"clear"}
            className="rounded"
            disabled={
              selectedBreeds.length === 0 && letterCategories.length === 0
            }
            onClick={async () => {
              setLetterCategories([]);
              setFilteredBreeds([]);
              setSelectedBreeds([]);
            }}
          >
            <span>Clear Chosen Breeds</span>
          </button>
        </label>
      </div>
      <div className="filtered-breeds">
        {letterCategories.length > 0 ? (
          filteredBreeds.map((breed) => (
            <label key={breed} className="alphabet-item">
              <input
                type="checkbox"
                value={breed}
                checked={selectedBreeds.includes(breed)}
                onChange={() => handleCheckboxChange(breed, selectedBreeds)}
              />
              <span>{breed.toUpperCase()}</span>
            </label>
          ))
        ) : (
          <p className="off-text">Select a letter to see breeds.</p>
        )}
      </div>
    </div>
  );
};

export default BreedsList;
