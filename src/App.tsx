import React from "react";

import "./styles/App.css";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={"/lilolme.gif"} className="App-logo" alt="logo" />
      </header>
      <LoginPage />
    </div>
  );
}

export default App;
