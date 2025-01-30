import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import './App.css'; // Custom styling

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Personal Finance Tracker</h1>
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
