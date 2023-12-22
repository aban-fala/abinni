import React from "react";
import Address from "./Address";

interface Props {
  data: string[];
  onClickAddress: (address: string) => void;
}

const Addresses: React.FC<Props> = ({ data, onClickAddress }) => {
  return (
    <>
      {data.length > 0 && (
        <div className="modal-address-container">
          {data.map((address: string) => (
            <Address key={address} address={address} onClick={onClickAddress} />
          ))}
        </div>
      )}
    </>
  );
};

export default Addresses;
