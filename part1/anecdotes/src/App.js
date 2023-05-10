import { useState, useEffect, useCallback } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(generateRandomNumber());
  const [votes, setVotes] = useState(Array(8).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  // always returns the index of the first occurrence of the maximum votes.
  const findIndexOfMaxVotes = useCallback(() => {
    let maxVotes = 0;
    let maxIndex = 0;

    votes.forEach((vote, index) => {
      if (vote > maxVotes) {
        maxVotes = vote;
        maxIndex = index;
      }
    });

    return maxIndex;
  }, [votes]);

  useEffect(() => {
    setMostVotes(findIndexOfMaxVotes());
  }, [votes, findIndexOfMaxVotes]);

  const selectNextAnecdote = () => {
    let randomNumber;
    do {
      randomNumber = generateRandomNumber();
    } while (randomNumber === selected);

    setSelected(randomNumber);
  };

  const voteNote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] = votes[selected] + 1;

    setVotes(updatedVotes);
  };

  function generateRandomNumber() {
    return Math.floor(Math.random() * anecdotes.length);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={voteNote}>vote</button>
      <button onClick={selectNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  );
};

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

export default App;
