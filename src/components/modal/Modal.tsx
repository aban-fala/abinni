import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { User } from "../../constants/types";
import { Button, Input, Select } from "@mantine/core";
import { statusOptions } from "../../constants/constant";


interface Props {
  user: User;
  onSubmitInfo: (info: User) => void;
  onClickCancel: () => void;
}

const Modal: React.FC<Props> = ({ user, onSubmitInfo, onClickCancel }) => {
  const { control, handleSubmit } = useForm<User>({
    defaultValues: user,
  });
  const onSubmit: SubmitHandler<User> = (data) => onSubmitInfo(data);

  return (
    <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-controller-wrapper">
        <div className="modal-controller">
          <label>First Name *: </label>
          <Controller
            name="name.first"
            control={control}
            render={({ field }) => <Input {...field} required={true}/>}
          />
        </div>
        <div className="modal-controller">
          <label>Middle Name: </label>
          <Controller
            name="name.middle"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className="modal-controller">
          <label>Last Name *: </label>
          <Controller
            name="name.last"
            control={control}
            render={({ field }) => <Input {...field} required={true}/>}
          />
        </div>
        <div className="modal-controller">
          <label>Status *: </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => <Select {...field} data={statusOptions} required={true}/>}
          />
        </div>
        <div className="modal-controller">
          <label>Date of Birth: </label>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value?.slice(0, 10)} type="date" required={true}/>
            )}
          />
        </div>
      </div>
      <div className="modal-controller-wrapper">
        <div className="modal-controller">
          <label>Addresses: </label>
          <Controller
            name="addresses"
            control={control}
            rules={{ required: 'Patient should have at least one address.' }}
            render={({ field }) => <Input {...field} required={true}/>}
          />
        </div>
      </div>
      <div className="modal-button-wrapper">
        <Button type="submit" className="modal-submit-button">
          Submit
        </Button>
        <Button onClick={onClickCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default Modal;
