import React from 'react';
import SummaryCards from '../components/SummaryCards';
import { useFinance } from '../context/financeContext';

export default function OverviewPage({ onOpenModal }) {
  const { transactions, deleteTransaction, totalIncome, totalExpense } = useFinance();

  const incomePercent = totalIncome + totalExpense > 0 
    ? Math.round((totalIncome / (totalIncome + totalExpense)) * 100) 
    : 50;
  const expensePercent = 100 - incomePercent;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white">نظرة عامة</h2>
          <p className="text-slate-400 text-sm mt-1">مرحباً بكِ، إليكِ ملخص الأداء المالي بالتفصيل.</p>
        </div>
        <button
          onClick={onOpenModal}
          className="bg-emerald-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
        >
          + إضافة معاملة جديدة
        </button>
      </div>

      <SummaryCards />

      {/* تحليل الميزانية */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4">تحليل الميزانية (Income vs Expense)</h3>
        <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden flex mb-4 dir-ltr">
          <div style={{ width: `${incomePercent}%` }} className="bg-emerald-500 h-full transition-all duration-500"></div>
          <div style={{ width: `${expensePercent}%` }} className="bg-rose-500 h-full transition-all duration-500"></div>
        </div>
        <div className="flex justify-between text-sm text-slate-300 font-medium">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            الدخل: {incomePercent}%
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            المصروفات: {expensePercent}%
          </span>
        </div>
      </div>

      {/* أحدث المعاملات */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4">أحدث المعاملات الأخيرة</h3>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((t) => (
            <div key={t.id} className="flex justify-between items-center p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div>
                <h4 className="font-bold text-white">{t.name}</h4>
                <p className="text-xs text-slate-400">{t.category} • {t.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-extrabold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount)}
                </span>
                <button onClick={() => deleteTransaction(t.id)} className="text-slate-500 hover:text-rose-400 font-bold">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}