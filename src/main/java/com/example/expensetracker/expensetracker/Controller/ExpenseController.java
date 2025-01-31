package com.example.expensetracker.expensetracker.Controller;

import com.example.expensetracker.expensetracker.Model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.expensetracker.expensetracker.Service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"https://expensetracker-frontend-p26u.onrender.com", "http://localhost:3000"}, 
            allowCredentials = "true",
            allowedHeaders = "*",
            methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

@RequestMapping("/api/expenses")
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

    @DeleteMapping("/delete-selected")
    public ResponseEntity<Void> deleteSelectedExpenses(@RequestBody List<Long> ids) {
        expenseService.deleteSelectedExpenses(ids);
        return ResponseEntity.ok().build();
    }
}

