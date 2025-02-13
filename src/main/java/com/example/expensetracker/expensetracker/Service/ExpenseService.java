package com.example.expensetracker.expensetracker.Service;

import com.example.expensetracker.expensetracker.Model.Expense;
import com.example.expensetracker.expensetracker.Repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

  

    public void deleteSelectedExpenses(List<Long> ids) {
        expenseRepository.deleteAllById(ids);
    }
}
