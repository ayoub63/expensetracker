package com.example.expensetracker.expensetracker.Controller;


import com.example.expensetracker.expensetracker.Model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.expensetracker.expensetracker.Service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @PostMapping
    public Expense saveExpense(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }
}

