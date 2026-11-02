import React, { useState, useEffect } from 'react';
import ReportsPage from './ReportsPage';
import { Wallet, Plus, Trash2, Sun, Moon } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [transactions, setTransactions] = useState(() => {
  const saved = localStorage.getItem('walletify_transactions');
  return saved ? JSON.parse(saved) : [
    { id: 1, description: 'راتب شهري', amount: 12000, type: 'income', category: 'مرتب ودخل', date: '2026-10-25' },
    { id: 2, description: 'مشتريات بقالة', amount: 850, type: 'expense', category: 'طعام ومقاضي', date: '2026-10-26' }
  ];
});
useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
// حفظ المعاملات تلقائياً في المتصفح كل ما تتحدث
useEffect(() => {
  localStorage.setItem('walletify_transactions', JSON.stringify(transactions));
}, [transactions]);
  const [newTx, setNewTx] = useState({ description: '', amount: '', type: 'expense' });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount) return;
    setTransactions([
      { id: Date.now(), description: newTx.description, amount: parseFloat(newTx.amount), type: newTx.type, date: '2026-10-28' },
      ...transactions
    ]);
    setNewTx({ description: '', amount: '', type: 'expense' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ background: darkMode ? '#030712' : '#f8fafc', color: darkMode ? '#f8fafc' : '#1e293b', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: darkMode ? '#111827' : '#ffffff', padding: '16px', borderRadius: '16px', border: darkMode ? '1px solid #1f2937' : '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Wallet style={{ width: '24px', height: '24px', color: '#10b981' }} />
            <h1 style={{ fontWeight: 'bold', fontSize: '18px', color: '#10b981' }}>{lang === 'ar' ? 'واليتفاي' : 'Walletify'}</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={{ padding: '6px 12px', background: darkMode ? '#1f2937' : '#f3f4f6', color: darkMode ? '#fff' : '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '6px 10px', background: darkMode ? '#1f2937' : '#f3f4f6', color: '#fbbf24', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
          <div style={{ padding: '12px', background: darkMode ? '#111827' : '#ffffff', borderRadius: '12px', border: darkMode ? '1px solid #1f2937' : '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af' }}>الرصيد</p>
            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#60a5fa' }}>{netBalance}</p>
          </div>
          <div style={{ padding: '12px', background: darkMode ? '#111827' : '#ffffff', borderRadius: '12px', border: darkMode ? '1px solid #1f2937' : '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af' }}>الدخل</p>
            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#10b981' }}>+{totalIncome}</p>
 </div>
          <div style={{ padding: '12px', background: darkMode ? '#111827' : '#ffffff', borderRadius: '12px', border: darkMode ? '1px solid #1f2937' : '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af' }}>المصروف</p>
            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#f43f5e' }}>-{totalExpenses}</p>
          </div>
        </div>

        {/* Add Button */}
        <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
          + {lang === 'ar' ? 'إضافة معاملة جديدة' : 'Add New Transaction'}
        </button>

        {/* Transactions */}
        <div style={{ background: darkMode ? '#111827' : '#ffffff', padding: '16px', borderRadius: '16px', border: darkMode ? '1px solid #1f2937' : '1px solid #e5e7eb' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '12px' }}>{lang === 'ar' ? 'المعاملات الأخيرة' : 'Recent Transactions'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {transactions.map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: darkMode ? '#1f2937' : '#f9fafb', borderRadius: '8px', fontSize: '13px' }}>
                <div>
                  <span style={{ fontWeight: '500' }}>{t.description}</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#9ca3af' }}>{t.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: t.type === 'income' ? '#10b981' : '#f43f5e' }}>
                    {t.type === 'income' ? '+' : '-'}{t.amount} ج.م
                  </span>
                  <button onClick={() => handleDelete(t.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
          <form onSubmit={handleAdd} style={{ background: '#111827', padding: '24px', borderRadius: '20px', width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid #1f2937' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '16px', margin: 0, color: '#fff' }}>إضافة معاملة جديدة</h3>
            
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>النوع</label>
              <select value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value})} style={{ width: '100%', padding: '10px', background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '10px', outline: 'none' }}>
                <option value="expense">مصروف</option>
                <option value="income">دخل</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>الفئة (لتتبع الفواتير والمصاريف)</label>
              <select value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} style={{ width: '100%', padding: '10px', background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '10px', outline: 'none' }}>
                <option value="فواتير كهرباء">⚡ فاتورة الكهرباء</option>
                <option value="فواتير مياه">💧 فاتورة المياه</option>
                <option value="إنترنت ومواصلات">🌐 إنترنت واتصالات</option>
                <option value="طعام ومقاضي">🛒 طعام ومقاضي</option>
                <option value="مرتب ودخل">💰 مرتب / دخل</option>
                <option value="أخرى">📌 مصاريف أخرى</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>الوصف</label>
              <input type="text" placeholder="مثال: فاتورة الشهر، شركة الاتصالات" required value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} style={{ width: '100%', padding: '10px', background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>المبلغ</label>
              <input type="number" placeholder="0.00" required value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} style={{ width: '100%', padding: '10px', background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '12px' }}>إلغاء</button>
              <button type="submit" style={{ padding: '8px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>حفظ المعاملة</button>
            </div>
</form>
</div>
      )}
      <ReportsPage transactions={transactions} darkMode={darkMode} />
    </div>
  );
}