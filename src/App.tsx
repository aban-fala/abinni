import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSpinnerController } from "./components/spinner/Spinner";
import { auth } from "./config/firebase";
import routes from "./config/routes";
import axiosInstance from "./utils/axios";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

