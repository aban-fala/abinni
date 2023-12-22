import React, { useEffect, useState } from "react";
import { Additionals } from "../../../../constants/types";
import { Input } from "@mantine/core";
import { Button } from "@mui/material";

interface Props {
  field: Additionals;
  onChangeField: (addtional: Additionals) => void;
  onClickRemove: () => void;
}

const AdditionalField: React.FC<Props> = ({
  field,
  onChangeField,
  onClickRemove,
}) => {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState<number | string>("");

  useEffect(() => {
    setLabel(field.key.toString() || "");
    setValue(field.value || "");
  }, [field]);

  const item = "w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 ";
  return (
    <div className="modal-controller-wrapper">
      <div className={item}>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => onChangeField({ key: label, value })}
          required={true}
        />
      </div>{" "}
      <div className={item}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onChangeField({ key: label, value })}
        />
      </div>{" "}
      <div className={item}>
        <Button variant="contained" onClick={onClickRemove}>
          x
        </Button>
      </div>
    </div>
  );
};

export default AdditionalField;
