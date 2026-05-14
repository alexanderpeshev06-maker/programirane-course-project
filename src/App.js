import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import {
  clearLogin,
  getSavedLogin,
  loginUser,
  registerUser,
  saveLogin,
} from "./services/authService";

const App = () => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (values) => {
    const { username, password } = values;

    if (username === "" || password === "") {
      alert("Please fill all fields!");
      return false;
    }

    const foundUser = await loginUser(username, password);

    if (foundUser) {
      setIsLoggedIn(true);
      setCurrentUsername(username);
      saveLogin(username);
      return true;
    } else {
      alert("Wrong username or password");
      return false;
    }
  };

  const handleRegister = async (values) => {
    const { username, password } = values;

    if (username === "" || password === "") {
      alert("Please fill all fields!");
      return false;
    }

    await registerUser(username, password);

    alert("Registered successfully!");
    return true;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUsername("");

    clearLogin();
  };

  useEffect(() => {
    const savedLogin = getSavedLogin();

    if (savedLogin.isLoggedIn) {
      setIsLoggedIn(true);
      setCurrentUsername(savedLogin.username);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <Home username={currentUsername} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
