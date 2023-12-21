import { CircularProgress } from "@mui/material";
import "./App.css";
import { auth } from "./config/firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Center from "./components/utils/Center";
import { useEffect, useState } from "react";
import AuthChecker from "./components/auth/AuthChecker";
import routes from "./config/routes";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.info("User detected.");
      } else {
        console.info("No user detected");
      }
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <Center>
        <CircularProgress />
      </Center>
    );

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                <AuthChecker>
                  <route.component />
                </AuthChecker>
              ) : (
                <route.component />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

