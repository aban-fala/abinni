import GoogleIcon from "@mui/icons-material/Google";
import { Button, Typography } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import axiosInstance from "../../utils/axios";
import { Center, useSpinnerController } from "../spinner/Spinner";

interface Props {}

const AuthContainer = (props: Props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showSpinner, hideSpinner] = useSpinnerController();

  const signInWithGoogle = async () => {
    setDisabled(true);
    showSpinner();
    try {
      const signInResponse = await signInWithPopup(auth, Providers.google);
      await axiosInstance.post("account", {
        email: signInResponse.user.email as string,
      });
      navigate("/");
    } catch (error: any) {
      setDisabled(false);
      setErrorMessage("Error while signin");
    } finally {
      setDisabled(false);
      hideSpinner();
    }
  };

  return (
    <Center height={"auto"}>
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        disabled={disabled}
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default AuthContainer;

