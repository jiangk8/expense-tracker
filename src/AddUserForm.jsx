import React from "react";
import { useForm } from "react-hook-form";

const AddUserForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => props.handleAddUser(data))}>
      <input
        placeholder="firstName"
        {...register("firstName", { required: true })}
      />
      <br />
      <br />
      {errors.firstName && <p>First name is required.</p>}
      <input
        placeholder="lastName"
        {...register("lastName", { required: true })}
      />
      {errors.lastName && <p>Last name is required.</p>}
      <br />
      <br />
      <input type="submit" />
    </form>
  );
};

export default AddUserForm;
