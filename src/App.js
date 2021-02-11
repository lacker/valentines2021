import React, { useEffect, useState } from "react";

import puzzles from "./puzzles";
import solutions from "./solutions";

import backspace from "./backspace.png";
import shuffle from "./shuffle.png";

function choice(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// In place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

let LetterButton = ({ letter, onClick }) => {
  return (
    <button
      className="h-20 w-20 m-2 px-5 border border-black rounded-lg text-5xl focus:outline-none"
      key={letter}
      onClick={onClick}
    >
      {letter}
    </button>
  );
};

let ImageButton = ({ alt, image, onClick }) => {
  return (
    <button
      className="h-20 w-20 m-2 px-5 border border-black rounded-lg text-5xl focus:outline-none"
      key={alt}
      onClick={onClick}
    >
      <img src={image} alt={alt} />
    </button>
  );
};

let MIN_LENGTH = 3;
let MAX_LENGTH = 7;

function App() {
  useEffect(() => {
    let letters = Array.from("VALTINE");
    shuffleArray(letters);
    document.title = letters.join("");
  }, []);

  let [length, setLength] = useState(MIN_LENGTH);
  let [solution, setSolution] = useState("");
  let [letters, setLetters] = useState([]);

  if (letters.length == 0) {
    // We need to initialize a new puzzle for this length
    let letterString = choice(puzzles[length]);
    let newSolution = choice(solutions[letterString]).toUpperCase();
    let newLetters = Array.from(letterString.toUpperCase());
    setSolution(newSolution);
    setLetters(newLetters);
    return null;
  }

  let select = letter => {
    console.log("selected", letter);
  };

  return (
    <div className="h-screen v-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <div className="text-5xl">{solution}</div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        {letters.map(letter =>
          LetterButton({ letter, onClick: () => select(letter) })
        )}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <ImageButton
          alt="shuffle"
          image={shuffle}
          onClick={() => {
            console.log("shuffle");
          }}
        />
        <ImageButton
          alt="backspace"
          image={backspace}
          onClick={() => {
            console.log("backspace");
          }}
        />
        <LetterButton
          letter="✓"
          onClick={() => {
            console.log("ok");
          }}
        />
      </div>
    </div>
  );
}

export default App;
