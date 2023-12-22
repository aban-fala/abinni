import React, { useEffect, useState } from "react";
import AdditionalField from "./AdditionalField";
import { Additionals } from "../../../../constants/types";

interface Props {
  additionals: Additionals;
  setAdditionals: (addtionals: Additionals) => void;
}

const AdditionalFields: React.FC<Props> = ({ additionals, setAdditionals }) => {
  const [additionalFields, setAdditionalFields] = useState<Additionals[]>([]);

  useEffect(() => {
    setAdditionalFields(
      Object.keys(additionals).map((key: string) => ({
        key,
        value: additionals[key],
      }))
    );
  }, [additionals]);

  const onChangeField = (index: number, additional: Additionals) => {
    additionalFields.splice(index, 1, additional);
    setAdditionals(
      additionalFields.reduce(
        (total: Additionals, field: Additionals) => ({
          ...total,
          [field.key.toString().toLowerCase()]: field.value,
        }),
        {}
      )
    );
  };

  const onClickRemove = (index: number) => {
    additionalFields.splice(index, 1);
    setAdditionals(
      additionalFields.reduce(
        (total: Additionals, field: Additionals) => ({
          ...total,
          [field.key.toString().toLowerCase()]: field.value,
        }),
        {}
      )
    );
  };
  return (
    <>
      {additionalFields.length > 0 &&
        additionalFields.map((field: Additionals, index: number) => (
          <AdditionalField
            key={index}
            field={field}
            onChangeField={(additional: Additionals) =>
              onChangeField(index, additional)
            }
            onClickRemove={() => onClickRemove(index)}
          />
        ))}
    </>
  );
};

export default AdditionalFields;
