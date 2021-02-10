import logo from "./logo.svg";
import "./App.css";

import choices from "./choices";
import valid from "./valid";

function choice(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function App() {
  let word = choice(choices);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {word}
        <br />
        VALID: {valid[word]}
      </header>
    </div>
  );
}

export default App;
