import React, { useState, useCallback } from "react";

function ChildComponent({ onClick }) {
  console.log("ChildComponent rendering");
  return <button onClick={onClick}>Click me</button>;
}

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Shokhrukh");

  // Without useCallback, the onClick function would change on every render
  // causing ChildComponent to re-render unnecessarily.
  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
    console.log("I am trying to use something new on git");
  }, []);

  // const handleClick = () => {
  //   setCount((prevCount) => prevCount + 1);
  // };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={() => setName((n) => n + "a")}>change name</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function App() {
  return (
    <div>
      <ParentComponent />
    </div>
  );
}

export default App;
