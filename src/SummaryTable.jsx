import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SummaryTable = (props) => {
  return (
    <TableContainer sx={{ width: 500 }} component={Paper}>
      <Table sx={{ width: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Total Expenses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.totalExpensesData.map((expense) => (
            <TableRow
              key={expense.category}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {expense.category}
              </TableCell>
              <TableCell component="th" scope="row">
                {expense.totalCost}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
