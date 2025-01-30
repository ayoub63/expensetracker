package com.example.expensetracker.expensetracker.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.expensetracker.expensetracker.Model.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
