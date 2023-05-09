function App() {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Joel" />
    </div>
  );
}

export default App;

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  );
};
