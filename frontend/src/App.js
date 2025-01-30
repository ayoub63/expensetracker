import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { theme } from './theme';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpenses';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar>
              <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary' }}>
                Expense Tracker
              </Typography>
              <Button component={Link} to="/" color="primary" sx={{ mx: 1 }}>
                Dashboard
              </Button>
              <Button component={Link} to="/add-expense" color="primary" variant="contained">
                Add Expense
              </Button>
            </Toolbar>
          </AppBar>

          <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<ExpenseList />} />
              <Route path="/add-expense" element={<AddExpense />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
