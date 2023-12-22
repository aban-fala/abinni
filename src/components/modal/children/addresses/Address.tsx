import { Chip } from "@mui/material";
import React from "react";

interface Props {
  address: string;
  onClick: (address: string) => void;
}
const Address: React.FC<Props> = ({ address, onClick }) => {
  return (
    <span className="mb-2 mx-1">
      <Chip
        label={address}
        onClick={() => onClick(address)}
        onDelete={() => onClick(address)}
      />
    </span>
  );
};

export default Address;
