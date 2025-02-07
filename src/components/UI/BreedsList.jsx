import { useState, useEffect } from "react";

const BreedsList = ({ allBreeds, selectedBreeds, setSelectedBreeds }) => {
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
      console.log("clicked");
      setFilteredBreeds(localFilteredBreeds);
    } else {
      setSelectedBreeds(updatedItems);
    }
  };

  console.log(alphabet, letterCategories, filteredBreeds);

  return (
    <div className="breeds-list">
      {/* Alphabet Checkboxes */}
      <h3>Breeds</h3>
      <div className="alphabet-filter">
        {alphabet.map((letterObj) => {
          const { letter, disabled } = letterObj;
          return (
            <label key={letter} className="alphabet-item">
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
            onClick={() => {
              setLetterCategories([]);
              setFilteredBreeds([]);
              setSelectedBreeds([]);
            }}
          >
            <span>Clear</span>
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
          <p>Select a letter to see breeds.</p>
        )}
      </div>
    </div>
  );
};

export default BreedsList;
