import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.title}: ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;