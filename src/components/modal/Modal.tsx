import { Input, Select } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { Additionals, Name, Patient, Status } from "../../constants/types";

import { Button } from "@mui/material";
import { statusOptions } from "../../constants/constant";
import AdditionalFields from "./children/additionals/Additionals";
import Addresses from "./children/addresses/Addresses";
import { stat } from "fs";

interface Props {
  patient: Patient;
  onSubmitInfo: (info: Patient) => void;
  onClickCancel: () => void;
}

const Modal: React.FC<Props> = ({ patient, onSubmitInfo, onClickCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");

  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>(Status.Empty);
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [additionals, setAdditionals] = useState<Additionals>({});
  const idRef = useRef("");

  useEffect(() => {
    setFirstName(patient.name.first || "");
    setMiddleName(patient.name.middle || "");
    setLastName(patient.name.last || "");
    setStatus(patient.status || Status.Empty);
    setDob(patient.dob || "");
    setAddresses(patient.addresses || []);
    setAdditionals(patient.additionals || {});
    if (patient.id) idRef.current = patient.id;
  }, [patient]);

  const addAddress = (address: string) => {
    const index: number = addresses.findIndex((i: string) => i === address);
    if (index >= 0) return;
    setAddresses([...addresses, address]);
  };

  const handleKeyUpAddressInput: React.KeyboardEventHandler<
    HTMLInputElement
  > = (e) => {
    const key = e.code || e.key;
    if (key === "Enter") {
      addAddress(e.currentTarget.value);
      setAddress("");
    }
  };

  const onClickAddress = (address: string) => {
    const index: number = addresses.findIndex((i: string) => i === address);
    if (index < 0) return;
    addresses.splice(index, 1);
    setAddresses([...addresses]);
  };

  const onClickAddField = () => {
    setAdditionals((val) => ({ ...val, key: "value" }));
  };

  const validation = () => {
    if (firstName.length <= 0) {
      alert("First name is required");
      return false;
    }
    if (lastName.length <= 0) {
      alert("Last name is required");
      return false;
    }
    if (status === Status.Empty) {
      alert("Status is required");
      return false;
    }
    if (dob.length <= 0) {
      alert("Dob is required");
      return false;
    }
    if (addresses.length <= 0) {
      alert("At lease one address is required");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validation()) return;
    const fullName: Name = { first: firstName, last: lastName };
    if (middleName) fullName.middle = middleName;
    const submitInfo: Patient = { name: fullName, status, dob, addresses };
    submitInfo.id = idRef.current;
    submitInfo.additionals = additionals;
    console.log("submitInfo", submitInfo);
    onSubmitInfo(submitInfo);
  };

  const item = "w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4";
  return (
    <form
      className="modal-form w-11/12"
      onSubmit={onSubmit}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    >
      <div className="flex w-1/10 flex-wrap">
        <div className={item}>
          <label>First Name *: </label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name here."
            required={true}
          />
        </div>
        <div className={item}>
          <label>Middle Name: </label>
          <Input
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Enter middle name here."
          />
        </div>
        <div className={item}>
          <label>Last Name *: </label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name here."
            required={true}
          />
        </div>
        <div className={item}>
          <label>Status *: </label>
          <Select
            data={statusOptions}
            value={status}
            onChange={(val: Status) => setStatus(val)}
            required={true}
          />
        </div>
        <div className={item}>
          <label>Date of Birth *: </label>
          <Input
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            type="date"
            required={true}
          />
        </div>

        <div className={item}>
          <div className="modal-controller">
            <label>Addresses: </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Press Enter after typing an address"
              title="Press Enter after typing an address"
              onKeyUp={handleKeyUpAddressInput}
            />
          </div>
          <div className="modal-controller-wrapper">
            <Addresses data={addresses} onClickAddress={onClickAddress} />
          </div>
        </div>
      </div>
      <AdditionalFields
        additionals={additionals}
        setAdditionals={setAdditionals}
      />
      <div className="modal-controller-wrapper">
        <Button variant="contained" onClick={onClickAddField}>
          Add a field
        </Button>
      </div>
      <div className={`${item} flex`}>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="contained" onClick={onClickCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Modal;
