import React from 'react';
import { useFinance } from '../context/financeContext';

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpense } = useFinance();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {/* إجمالي الرصيد */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <p className="text-slate-400 text-sm font-medium">الرصيد الحالي</p>
        <h3 className="text-3xl font-bold text-white mt-2">${totalBalance.toFixed(2)}</h3>
      </div>

      {/* إجمالي الدخل */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <p className="text-slate-400 text-sm font-medium">إجمالي الدخل</p>
        <h3 className="text-3xl font-bold text-emerald-400 mt-2">${totalIncome.toFixed(2)}</h3>
      </div>

      {/* إجمالي المصاريف */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <p className="text-slate-400 text-sm font-medium">إجمالي المصاريف</p>
        <h3 className="text-3xl font-bold text-rose-400 mt-2">${totalExpense.toFixed(2)}</h3>
      </div>
    </div>
  );
}