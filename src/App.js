import React, { useEffect, useRef, useState } from "react";

import PUZZLES from "./puzzles";
import SOLUTIONS from "./solutions";

import backspace from "./backspace.png";
import shuffle from "./shuffle.png";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => window.clearInterval(id);
    }
    return null;
  }, [delay]);
}

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
      className="h-20 w-20 m-1 px-5 border shadow-md border-black rounded-lg text-5xl focus:outline-none"
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
      className="h-20 w-20 m-1 px-5 border shadow-md border-black rounded-lg text-5xl focus:outline-none"
      key={alt}
      onClick={onClick}
    >
      <img src={image} alt={alt} />
    </button>
  );
};

let LetterBar = ({ letters, select }) => {
  let mid = Math.ceil(letters.length / 2);
  let firstHalf = letters.slice(0, mid);
  let secondHalf = letters.slice(mid);
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        {firstHalf.map(letter =>
          LetterButton({ letter, onClick: () => select(letter) })
        )}
      </div>
      <div className="flex justify-center items-center">
        {secondHalf.map(letter =>
          LetterButton({ letter, onClick: () => select(letter) })
        )}
      </div>
    </div>
  );
};

let MIN_LENGTH = 3;
let MAX_LENGTH = 7;

function App() {
  let [message, setMessage] = useState("");
  let [length, setLength] = useState(MIN_LENGTH);
  let [solution, setSolution] = useState("");
  let [letters, setLetters] = useState([]);
  let [partial, setPartial] = useState("");
  let [score, setScore] = useState(0);
  let [hint, setHint] = useState("");
  let [ticks, setTicks] = useState(0);
  let [puzzleNumber, setPuzzleNumber] = useState(0);

  useEffect(() => {
    let letters = Array.from("VALTINE");
    shuffleArray(letters);
    let name = letters.join("");
    document.title = name;
    setMessage(`welcome to ${name}. tap anywhere to play`);
  }, []);

  useInterval(() => {
    let newTicks = ticks + 1;
    setTicks(newTicks);
    if (newTicks % 150 === 0 && hint.length < solution.length) {
      console.log("have a hint");
      // Extend the hint
      setHint(solution.slice(0, hint.length + 1));
    }
  }, 100);

  let newPuzzle = (num, newLength) => {
    if (newLength < MIN_LENGTH) {
      newLength = MIN_LENGTH;
    }
    if (newLength > MAX_LENGTH) {
      newLength = MAX_LENGTH;
    }

    let letterString = choice(PUZZLES[newLength]);
    let newSolution = choice(SOLUTIONS[letterString]).toUpperCase();
    let newLetters = Array.from(letterString.toUpperCase());
    shuffleArray(newLetters);

    setMessage("");
    setLength(newLength);
    setSolution(newSolution);
    setLetters(newLetters);
    setPartial("");
    setHint("");
    setTicks(0);
    setPuzzleNumber(num);
  };

  if (message.length > 0) {
    return (
      <button
        className="h-screen w-screen flex justify-center items-center focus:outline-none"
        onClick={() => {
          console.log("onclick");
          setScore(0);
          newPuzzle(1, MIN_LENGTH);
        }}
      >
        {message}
      </button>
    );
  }

  if (letters.length === 0) {
    return <div>{"loading..."}</div>;
  }

  let select = letter => {
    console.log("selected", letter);
    setPartial(partial + letter);
  };

  return (
    <div style={{ height: "90vh" }}>
      <div className="h-full flex flex-col">
        <div className="flex-none relative p-2">
          <span className="absolute left-2">
            {hint.length === 0 ? null : "hint: " + hint}
          </span>
          <span className="absolute right-2">{"score: " + score}</span>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-5xl">{partial}</div>
        </div>
        <LetterBar letters={letters} select={select} />
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
              if (window.CHECKER[partial.toLowerCase()]) {
                let deltaScore = Math.max(1, letters.length - hint.length);
                let newScore = score + deltaScore;
                setScore(newScore);

                if (puzzleNumber >= 10) {
                  setMessage(
                    `your score was ${newScore}. tap anywhere to play again!`
                  );
                } else if (hint.length === 0) {
                  console.log("good work");
                  let sound = new Audio();
                  sound.src = "./valentines2021/yay.mp3";
                  sound.play();
                  newPuzzle(puzzleNumber + 1, length + 1);
                } else if (hint.length === 1) {
                  console.log("you did have a hint");
                  newPuzzle(puzzleNumber + 1, length);
                } else {
                  console.log("you did have multiple hints");
                  newPuzzle(puzzleNumber + 1, length - 1);
                }
              } else {
                console.log("not a word");
                setPartial("");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
