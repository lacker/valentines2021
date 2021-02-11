import React, { useEffect } from "react";

import puzzles from "./puzzles";
import solutions from "./solutions";

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

function App() {
  useEffect(() => {
    let letters = Array.from("VALTINE");
    shuffleArray(letters);
    document.title = letters.join("");
  }, []);

  let len = choice([3, 4, 5, 6, 7]);
  let letters = choice(puzzles[len]);
  let solution = choice(solutions[letters]).toUpperCase();
  return (
    <div className="h-screen v-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <div className="text-5xl">{solution}</div>
      </div>
      <div className="flex-1">{letters.toUpperCase()}</div>
      <div className="flex-1">shuffle / backspace / submit</div>
    </div>
  );
}

export default App;
