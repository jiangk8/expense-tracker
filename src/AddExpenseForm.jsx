import React from "react";
import { useForm } from "react-hook-form";
import { ExpenseCategories } from "./constants";

const AddExpenseForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const expenseCategories = Object.values(ExpenseCategories);

  return (
    <form onSubmit={handleSubmit((data) => props.handleAddExpense(data))}>
      <label for="users">User: </label>
      <select name="users" {...register("user", { required: true })}>
        {props.userData.map((user) => {
          const fullName = user.firstName.concat(" ", user.lastName);
          return <option value={[user.userId, fullName]}>{fullName}</option>;
        })}
      </select>
      <br />
      <br />
      <label for="categories">Category: </label>
      <select name="categories" {...register("category", { required: true })}>
        {expenseCategories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <br />
      <br />
      <label for="description">Description: </label>
      <textarea {...register("description", { required: true })} />
      <br />
      <br />
      <label for="cost">Cost: </label>
      <input type="number" {...register("cost", { required: true })} />
      <br />
      <br />
      <input type="submit" />
    </form>
  );
};

export default AddExpenseForm;
