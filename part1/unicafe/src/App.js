import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodValue = (newValue) => {
    setGood(newValue);
  };

  const setNeutralValue = (newValue) => {
    setNeutral(newValue);
  };

  const setBadValue = (newValue) => {
    setBad(newValue);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodValue(good + 1)} text="Good" />
      <Button handleClick={() => setNeutralValue(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBadValue(bad + 1)} text="Bad" />

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good * 1 + bad * -1) / (good + neutral + bad)}</p>
      <p>positive {(good / (good + neutral + bad)) * 100} %</p>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

export default App;
