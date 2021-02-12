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
      className="h-20 w-20 m-2 px-5 border shadow-md border-black rounded-lg text-5xl focus:outline-none"
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
      className="h-20 w-20 m-2 px-5 border shadow-md border-black rounded-lg text-5xl focus:outline-none"
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
  let [partial, setPartial] = useState("");
  let [score, setScore] = useState(0);
  let [hint, setHint] = useState("");

  let newPuzzle = newLength => {
    if (newLength < MIN_LENGTH) {
      newLength = MIN_LENGTH;
    }
    if (newLength > MAX_LENGTH) {
      newLength = MAX_LENGTH;
    }

    let letterString = choice(puzzles[newLength]);
    let newSolution = choice(solutions[letterString]).toUpperCase();
    let newLetters = Array.from(letterString.toUpperCase());
    shuffleArray(newLetters);

    setLength(newLength);
    setSolution(newSolution);
    setLetters(newLetters);
    setPartial("");
    setHint("");
  };

  if (letters.length === 0) {
    newPuzzle(length);
    return null;
  }

  let select = letter => {
    console.log("selected", letter);
    setPartial(partial + letter);
  };

  return (
    <div>
      <div className="relative p-2">
        <span className="absolute left-2">
          {hint.length === 0 ? null : "hint: " + hint}
        </span>
        <span className="absolute right-2">{"score: " + score}</span>
      </div>
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-5xl">{partial}</div>
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
              let newLetters = Array.from(letters);
              while (letters.join() === newLetters.join()) {
                shuffleArray(newLetters);
              }
              setLetters(newLetters);
            }}
          />
          <ImageButton
            alt="backspace"
            image={backspace}
            onClick={() => {
              console.log("backspace");
              setPartial(partial.slice(0, -1));
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
    </div>
  );
}

export default App;
