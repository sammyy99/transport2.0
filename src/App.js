import React from "react";
import LoginPage from "./Components/LoginPage";
import { Provider } from "react-redux";
import appstore from "./Redux/appstore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";

const App = () => {
  return (
    <Provider store={appstore}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home/*" element={<Homepage/>}>
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
