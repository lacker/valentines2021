import logo from "./logo.svg";
import "./App.css";

import puzzles from "./puzzles";
import solutions from "./solutions";
// import valid from "./valid";

function choice(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function App() {
  let len = choice([3, 4, 5, 6, 7]);
  let letters = choice(puzzles[len]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        LEN: {len}
        <br />
        {letters}
        <br />
        SOLUTION: {choice(solutions[letters])}
      </header>
    </div>
  );
}

export default App;
