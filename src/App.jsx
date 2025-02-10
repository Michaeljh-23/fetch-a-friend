import React, { useState, useEffect } from "react";
import "./styles/App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { checkAuthStatus, logout } from "./api/auth.ts";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import PaletteGrid from "./components/UI/PaletteGrid.jsx";
import Loading from "./components/UI/Loading.jsx";

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
    if (authChecked && !loggedIn) {
      navigate("/login");
    } else if (loggedIn) {
      navigate("/search");
    }
  }, [authChecked, loggedIn]);

  if (!authChecked) {
    return (
      <div className="blank-loading-wrap">
        <Loading />
      </div>
    );
  }
  const logoutClick = async () => {
    await logout();
    setLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className="App">
      <header className="app-header">
        <div className="logo-group">
          <img
            src={"/puppies-banner-stock-btm.jpg"}
            className="app-logo"
            alt="logo"
          />
          <h2 className="header-text">Fetch-a-Friend</h2>
        </div>
        {loggedIn ? (
          <button
            // style={loggedIn ? { display: "relative" } : { display: "none" }}
            onClick={logoutClick}
            className="rounded logout-btn"
            tabIndex={0}
          >
            logout
          </button>
        ) : (
          <></>
        )}
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
              <SearchPage authChecked={loggedIn} />
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
      {/* <PaletteGrid /> */}
    </div>
  );
}

export default App;
