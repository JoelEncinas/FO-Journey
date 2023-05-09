function App() {
  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];

  return (
    <div>
      <h1>Greetings</h1>
      <Hello friends={friends} />
    </div>
  );
}

export default App;

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.friends[0].name} {props.friends[1].age}</p>
    </div>
  );
};
