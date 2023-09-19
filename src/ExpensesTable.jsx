import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { ExpenseCategories } from "./constants";

const EditModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ExpensesTable = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(0);

  const expenseCategories = Object.values(ExpenseCategories);

  const handleEditButton = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setIsEditExpenseModalOpen(true);
  };

  return (
    <>
      <TableContainer sx={{ width: 800 }} component={Paper}>
        <Table sx={{ width: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expense ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.expensesData.map((expense) => (
              <TableRow
                key={expense.expenseId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {expense.expenseId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {expense.userId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {expense.name}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.cost}</TableCell>
                <TableCell>
                  <button onClick={() => handleEditButton(expense.expenseId)}>
                    Edit
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      props.handleDeleteExpense(
                        expense.expenseId,
                        expense.userId
                      )
                    }
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isEditExpenseModalOpen}
        onClose={() => setIsEditExpenseModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={EditModalStyle}>
          <form
            onSubmit={handleSubmit((data) => {
              props.handleEditExpense(data, selectedExpenseId);
              setIsEditExpenseModalOpen(false);
            })}
          >
            <label for="users">User: </label>
            <select name="users" {...register("user", { required: true })}>
              {props.userData.map((user) => {
                const fullName = user.firstName.concat(" ", user.lastName);
                return (
                  <option value={[user.userId, fullName]}>{fullName}</option>
                );
              })}
            </select>
            <br />
            <br />
            <label for="categories">Category: </label>
            <select
              name="categories"
              {...register("category", { required: true })}
            >
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
        </Box>
      </Modal>
    </>
  );
};

export default ExpensesTable;
