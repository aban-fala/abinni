import { useAtom } from "jotai";
import { spinnerAtom } from "../../utils/atoms";
import { CircularProgress } from "@mui/material";

interface CenterProps {
  children: React.ReactNode;
  height?: number | string;
}

export const Center = ({ children, height = 100 }: CenterProps) => {
  let useHeight;
  if (typeof height === "string") useHeight = height;
  else useHeight = height + "vh";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: useHeight,
      }}
    >
      {children}
    </div>
  );
};

export const useSpinnerController = () => {
  const [, setCounter] = useAtom(spinnerAtom);
  const showSpinner = () => {
    setCounter((val) => val + 1);
  };
  const hideSpinner = () => {
    setCounter((val) => val - 1);
  };
  return [showSpinner, hideSpinner];
};

const Spinner: React.FC = () => {
  const [hasSpinner] = useAtom(spinnerAtom);
  if (!hasSpinner) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Spinner;
