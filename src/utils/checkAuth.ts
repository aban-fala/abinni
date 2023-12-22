import { useEffect } from "react";
import { useSpinnerController } from "../components/spinner/Spinner";
import { auth } from "../config/firebase";
import axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
  const [showSpinner, hideSpinner] = useSpinnerController();
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        showSpinner();
        const idToken = await user?.getIdToken();
        axiosInstance.defaults.headers["Authorization"] = idToken;
        console.info(
          "User detected",
          idToken,
          axiosInstance.defaults.headers["Authorization"]
        );
        hideSpinner();
        navigate("/");
      } else {
        axiosInstance.defaults.headers["Authorization"] = "";
        console.info("No user detected");
        navigate("/login");
      }
    });
  }, []);
};
