const Hello = (props) => {
  console.log(props)
    return (
    <div>
      <p>Hello world, {props.name}</p>
    </div>
  );
};

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);
  return (
    <div>
      <Hello name="HongYi" />
      <p>I am Hong Yi</p>
    </div>
  );
};

export default App;
