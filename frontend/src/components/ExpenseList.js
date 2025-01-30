import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Typography, Button } from '@mui/material';
import BudgetTracker from './BudgetTracker';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import API_URL from '../config';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/expenses`);
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
  
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedIds.length} selected expense(s)?`);
    if (!confirmDelete) return;
  
    setLoading(true);
    try {
      console.log('Sending delete request with IDs:', selectedIds);
      
      await axios({
        method: 'DELETE',
        url: `${API_URL}/api/expenses/delete-selected`,
        data: selectedIds,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      
      await fetchExpenses();
      setSelectedIds([]);
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      alert(`Failed to delete expenses: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { 
      field: 'amount', 
      headerName: 'Amount',
      width: 130,
      valueFormatter: (params) => {
        return `€${params.value.toFixed(2)}`;
      }
    },
    { field: 'category', headerName: 'Category', width: 130 },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 130,
      valueFormatter: (params) => {
        return format(new Date(params.value), 'dd/MM/yyyy');
      }
    }
  ];

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };

  const handleSelectionChange = (newSelectionModel) => {
    console.log('Selection changed:', newSelectionModel);
    setSelectedIds(newSelectionModel);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Expense Overview
      </Typography>

      <Box sx={{ mb: 4 }}>
        <BudgetTracker expenses={expenses} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Expense List
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          Delete Selected ({selectedIds.length})
        </Button>
      </Box>

      <Paper sx={{ mb: 4 }}>
        <DataGrid
          rows={expenses}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          loading={loading}
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={selectedIds}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 }
            },
          }}
        />
      </Paper>

      <Paper sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Expenses by Category
        </Typography>
        <Box sx={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {Object.keys(expensesByCategory).length > 0 ? (
            <Box sx={{ height: '100%', width: '100%', maxWidth: 600 }}>
              <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
            </Box>
          ) : (
            <Typography variant="body1">
              No expenses to display
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default ExpenseList;
