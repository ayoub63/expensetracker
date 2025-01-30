import React, { useState } from 'react';
import axios from 'axios';

function AddExpense() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('FOOD');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/expenses', { title, amount, category })
      .then(response => alert('Expense Added'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="FOOD">Food</option>
        <option value="TRANSPORT">Transport</option>
        <option value="ENTERTAINMENT">Entertainment</option>
        <option value="BILLS">Bills</option>
        <option value="OTHER">Other</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpense;
