import React from 'react';
import { useFinance } from '../context/financeContext';

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpense } = useFinance();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <p className="text-slate-400 text-sm font-medium">الرصيد الإجمالي الحالي</p>
        <h3 className="text-3xl font-black text-white mt-2">${totalBalance.toLocaleString()}</h3>
        <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <p className="text-slate-400 text-sm font-medium">إجمالي الدخل (Income)</p>
        <h3 className="text-3xl font-black text-emerald-400 mt-2">+${totalIncome.toLocaleString()}</h3>
        <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <p className="text-slate-400 text-sm font-medium">إجمالي المصروفات (Expenses)</p>
        <h3 className="text-3xl font-black text-rose-400 mt-2">-${totalExpense.toLocaleString()}</h3>
        <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-rose-500/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}