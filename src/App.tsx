import React, { useState, useEffect } from "react";
import "./styles/App.css";
import LoginPage from "./pages/LoginPage";
import { checkAuthStatus, logout } from "./api/auth.ts";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};
const CorrectRoute = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? children : <Navigate to="/search" />;
};

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      let isLoggedIn = await checkAuthStatus();
      setLoggedIn(isLoggedIn);
      setAuthChecked(true);
    };
    verifyAuth();
  }, [loggedIn]);

  useEffect(() => {
    authChecked && !loggedIn && navigate("/login");
  }, [authChecked]);

  if (!authChecked) {
    return <div>Loading...</div>; // TODO Loading Page
  }
  const logoutClick = async () => {
    await logout();
    setLoggedIn(false);
    navigate("/login");
  };
  console.log(loggedIn);

  return (
    <div className="App">
      <header className="App-header">
        <img src={"/lilolme.gif"} className="App-logo" alt="logo" />
        <button
          style={loggedIn ? { display: "relative" } : { display: "none" }}
          onClick={logoutClick}
        >
          logout
        </button>
      </header>
      <Routes>
        <Route
          path="/login"
          element={
            <CorrectRoute isAuthenticated={loggedIn}>
              <LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </CorrectRoute>
          }
        />
        {/* <Route path="/search" element={<SearchPage />} /> */}
        <Route
          path="/search"
          element={
            <ProtectedRoute isAuthenticated={loggedIn}>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        {/* Add a catch all */}
        {/* <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/search" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          /> */}
      </Routes>
      <p>{loggedIn ? "true" : "false"}</p>
    </div>
  );
}

export default App;
