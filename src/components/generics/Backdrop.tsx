import React from "react";
interface Props {
  onClick: () => void;
  isLoading: boolean;
}
const Backdrop: React.FC<Props> = ({ onClick, isLoading }) => {
  return (
      <div className="backdrop" onClick={onClick}>
        {/* {isLoading && <Loader />} */}
        </div>
  );
};

export default Backdrop;
