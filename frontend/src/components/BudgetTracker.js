import React, { useState } from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function BudgetTracker({ expenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useState(() => {
    return localStorage.getItem('monthlyBudget') || 2000;
  });
  const [tempBudget, setTempBudget] = useState(budget);

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const budgetProgress = (totalExpenses / budget) * 100;

  const handleSaveBudget = () => {
    const newBudget = parseFloat(tempBudget);
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget);
      localStorage.setItem('monthlyBudget', newBudget);
    }
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Monthly Budget Overview
          </Typography>
          <IconButton onClick={() => setIsEditing(true)} size="small">
            <EditIcon />
          </IconButton>
        </Box>

        {isEditing ? (
          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <TextField
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: '€',
              }}
            />
            <Button variant="contained" onClick={handleSaveBudget}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(budgetProgress, 100)}
              color={budgetProgress > 90 ? "error" : "primary"}
            />
          </Box>
        )}

        <Typography>Budget: €{parseFloat(budget).toFixed(2)}</Typography>
        <Typography>Spent: €{totalExpenses.toFixed(2)}</Typography>
        <Typography>Remaining: €{remainingBudget.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
}

export default BudgetTracker; 