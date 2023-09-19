import React, { useState } from "react";
import { createUser } from "./helperFunctions";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";

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

const UsersTable = (props) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const handleEditButton = (userId) => {
    setSelectedUserId(userId);
    setIsEditUserModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <TableContainer sx={{ width: 500 }} component={Paper}>
        <Table sx={{ width: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Expenses Total</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userData.map((user) => (
              <TableRow
                key={user.userId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.userId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.firstName}
                </TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.expensesTotal}</TableCell>
                <TableCell>
                  <button onClick={() => handleEditButton(user.userId)}>
                    Edit
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => props.handleDeleteUser(user.userId)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={EditModalStyle}>
          <form
            onSubmit={handleSubmit((data) => {
              props.handleEditUser(data, selectedUserId);
              setIsEditUserModalOpen(false);
            })}
          >
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
        </Box>
      </Modal>
    </>
  );
};

export default UsersTable;
