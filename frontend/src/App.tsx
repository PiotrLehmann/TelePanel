import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;