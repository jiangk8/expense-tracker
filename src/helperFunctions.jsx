const createUser = (userId, firstName, lastName, expensesTotal) => {
  return { userId, firstName, lastName, expensesTotal };
};

const createExpense = (
  expenseId,
  userId,
  name,
  category,
  description,
  cost
) => {
  return { expenseId, userId, name, category, description, cost };
};

export { createUser, createExpense };
