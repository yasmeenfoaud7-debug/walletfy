import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const initialTransactions = [
    { id: 1, name: 'راتب شهري', amount: 12000, type: 'income', category: 'salary' },
    { id: 2, name: 'سوبر ماركت', amount: 850, type: 'expense', category: 'groceries' },
    { id: 3, name: 'فاتورة الإنترنت', amount: 400, type: 'expense', category: 'bills' },
    { id: 4, name: 'شراء مستلزمات مكتبية', amount: 300, type: 'expense', category: 'supplies' }
  ];

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('app_finance_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // إضافة حالة اللغة (افتراضياً عربي) ودالة تغييرها
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    localStorage.setItem('app_finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = async (transaction) => {
    try {
      // محاكاة الإضافة أو ربط الـ API
      setTransactions((prev) => [transaction, ...prev]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setTransactions((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount);
  }, 0);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        totalBalance,
        totalIncome,
        totalExpense,
        currency: 'EGP',
        lang,     // متغير اللغة المضاف
        setLang   // دالة تغيير اللغة المضافة
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);