import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, seLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(2);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, SetPassword] = useState(false); 

  return (
    <>
      {" "}
      <h1 className="text-4xl text-center">Password Generator </h1>{" "}
    </>
  );
}

export default App;
