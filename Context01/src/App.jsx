import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserContextProvider from "./Context/UserContextProvider";
import Login from "./Componens/Login";
import Profile from "./Componens/Profile"
function App() {
  const [count, setCount] = useState(0);

  return (
    <UserContextProvider>
      <h2>Welcome to the context api project</h2>
      <Login />
      <Profile />
    </UserContextProvider>
  );
}

export default App;
