import React, { useState } from "react";
import UsersTable from "./UsersTable";
import ExpensesTable from "./ExpensesTable";
import AddUserForm from "./AddUserForm";
import AddExpenseForm from "./AddExpenseForm";
import { createUser, createExpense } from "./helperFunctions";
import SummaryTable from "./SummaryTable";
import { ExpenseCategories } from "./constants";

function App() {
  const [userIdCounter, setUserIdCounter] = useState(0);
  const [expenseIdCounter, setExpenseIdCounter] = useState(0);
  const [userData, setUserData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);

  // User Functions
  // ----------------------------------------
  //used in addUserForm
  const handleAddUser = (data) => {
    const newUser = createUser(userIdCounter, data.firstName, data.lastName, 0);
    setUserIdCounter(userIdCounter + 1);
    setUserData([...userData, newUser]);
  };

  //used in UsersTable
  const handleEditUser = (data, userId) => {
    const selectedUserIndex = userData.findIndex(
      (user) => user.userId === userId
    );
    userData[selectedUserIndex].firstName = data.firstName;
    userData[selectedUserIndex].lastName = data.lastName;

    //update expenses table
    expensesData.map((expense, index) => {
      if (expense.userId == userId) {
        expensesData[index].name = data.firstName.concat(" ", data.lastName);
      }
    });
    setExpensesData([...expensesData]);
  };

  //used in UsersTable
  const handleDeleteUser = (userId) => {
    const selectedUserIndex = userData.findIndex(
      (user) => user.userId === userId
    );
    userData.splice(selectedUserIndex, 1);
    setUserData([...userData]);

    //update expenses table
    // filter out the expenses of the deleted user leaving only non deleted users expenses
    const filteredExpenses = expensesData.filter(
      (expense) => expense.userId != userId
    );
    setExpensesData([...filteredExpenses]);
  };

  //User Functions End
  //----------------------------------------------------
  //Expense Functions
  //used in AddExpenseForm
  const handleAddExpense = (data) => {
    const user = data.user.split(",");
    const userId = user[0];
    const fullName = user[1];
    const newExpense = createExpense(
      expenseIdCounter,
      userId,
      fullName,
      data.category,
      data.description,
      data.cost
    );
    setExpenseIdCounter(expenseIdCounter + 1);
    setExpensesData([...expensesData, newExpense]);

    //update user table
    const userTableIndex = userData.findIndex((user) => user.userId == userId);
    userData[userTableIndex].expensesTotal += Number(data.cost);
  };

  //Used in Expenses Table
  const handleEditExpense = (data, expenseId) => {
    const selectedExpenseIndex = expensesData.findIndex(
      (expense) => expense.expenseId === expenseId
    );

    const originalCost = expensesData[selectedExpenseIndex].cost;
    const userId = expensesData[selectedExpenseIndex].userId;

    const splitNameData = data.user.split(",");
    const newUserId = splitNameData[0];
    const fullName = splitNameData[1];

    expensesData[selectedExpenseIndex].category = data.category;
    expensesData[selectedExpenseIndex].description = data.description;
    expensesData[selectedExpenseIndex].cost = data.cost;
    expensesData[selectedExpenseIndex].name = fullName;
    expensesData[selectedExpenseIndex].userId = newUserId;

    //update user table
    //new user Id
    const userTableIndex = userData.findIndex(
      (user) => user.userId == newUserId
    );

    const splitFullName = fullName.split(" ");

    userData[userTableIndex].firstName = splitFullName[0];
    userData[userTableIndex].lastName = splitFullName[1];
    userData[userTableIndex].userId = newUserId;

    // update cost for same old and new user
    if (userId == newUserId) {
      const differenceCost = originalCost - data.cost;
      if (originalCost > data.cost) {
        userData[userTableIndex].expensesTotal -= Math.abs(differenceCost);
      } else if (data.cost > originalCost) {
        userData[userTableIndex].expensesTotal += Math.abs(differenceCost);
      }
    } else {
      //update cost for new and old user
      const originalUserIndex = userData.findIndex(
        (user) => user.userId == userId
      );
      userData[originalUserIndex].expensesTotal -= originalCost;

      userData[userTableIndex].expensesTotal += Number(data.cost);
    }
    setUserData([...userData]);
  };

  const handleDeleteExpense = (expenseId, userId) => {
    const selectedExpenseIndex = expensesData.findIndex(
      (expense) => expense.expenseId === expenseId
    );
    const expenseCost = Number(expensesData[selectedExpenseIndex].cost);
    expensesData.splice(selectedExpenseIndex, 1);
    setExpensesData([...expensesData]);

    //update user table
    const userTableIndex = userData.findIndex((user) => user.userId == userId);
    userData[userTableIndex].expensesTotal -= expenseCost;
  };

  //---------------------------Expense table end
  
  //calculate total Expenses by category
  let totalFoodCost = 0;
  let totalActivitiesCost = 0;
  let totalOfficeEquipmentCost = 0;
  expensesData.forEach((expense) => {
    if (expense.category === ExpenseCategories.FOOD) {
      totalFoodCost += Number(expense.cost);
    } else if (expense.category === ExpenseCategories.OFFICEQUIPMENT) {
      totalOfficeEquipmentCost += Number(expense.cost);
    } else if (expense.category === ExpenseCategories.ACTIVITIES) {
      totalActivitiesCost += Number(expense.cost);
    }
  });

  const totalExpensesData = [
    { category: ExpenseCategories.FOOD, totalCost: totalFoodCost },
    {
      category: ExpenseCategories.OFFICEQUIPMENT,
      totalCost: totalOfficeEquipmentCost,
    },
    { category: ExpenseCategories.ACTIVITIES, totalCost: totalActivitiesCost },
  ];

  return (
    <div>
      <h1>Add user</h1>
      <AddUserForm handleAddUser={handleAddUser} />
      <h1>Users Table</h1>
      <UsersTable
        userData={userData}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
      />
      <hr />
      <h1>Add Expense</h1>
      <AddExpenseForm userData={userData} handleAddExpense={handleAddExpense} />
      <h1>Expenses Table</h1>
      <ExpensesTable
        userData={userData}
        expensesData={expensesData}
        handleEditExpense={handleEditExpense}
        handleDeleteExpense={handleDeleteExpense}
      />
      <hr />
      <h1>Summary Table</h1>
      <SummaryTable totalExpensesData={totalExpensesData} />
    </div>
  );
}

export default App;
