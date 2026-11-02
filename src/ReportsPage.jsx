import React from 'react';

export default function ReportsPage({ transactions, darkMode }) {
  // 1. حساب إجمالي الدخل والمصاريف
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // 2. تجميع المصاريف حسب الفئة (Category)
  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const cat = t.category || 'مصاريف أخرى';
      acc[cat] = (acc[cat] || 0) + Number(t.amount);
      return acc;
    }, {});

  return (
    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-6">📊 التقارير والتحليلات المالية</h2>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-sm text-emerald-400 mb-1">إجمالي الدخل</p>
         <p className="text-2xl font-bold text-emerald-500">+{totalIncome}</p>
        </div>
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <p className="text-sm text-rose-400 mb-1">إجمالي المصروفات</p>
          <p className="text-2xl font-bold text-rose-500">-{totalExpenses}</p>
        </div>
      </div>

      {/* تحليل المصاريف حسب الفئات */}
      <div className={`p-5 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow-sm'} mb-6`}>
        <h3 className="text-lg font-semibold mb-4">تفاصيل المصاريف حسب الفئة</h3>
        
        {Object.keys(expensesByCategory).length === 0 ? (
          <p className="text-gray-400 text-sm">لا توجد مصاريف مسجلة حتى الآن.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(expensesByCategory).map(([category, amount]) => {
              const percentage = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{category}</span>
                    <span>{amount} ج.م ({percentage}%)</span>
                  </div>
                  {/* شريط التقدم البصري */}
                  <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden">
                    <div
  className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
  style={{ width: `${percentage}%` }}
></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}