package com.example.expensetracker.expensetracker.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.expensetracker.expensetracker.Model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
