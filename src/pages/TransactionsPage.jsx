 import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/financeContext';
import { 
  Plus, 
  Trash2, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search 
} from 'lucide-react';

const tData = {
  ar: {
    recentTransactions: 'المعاملات الأخيرة',
    addTransaction: '+ إضافة معاملة جديدة',
    noTransactionsTitle: 'لا توجد معاملات حتى الآن',
    noTransactionsDesc: 'أضف معاملتك الأولى لبدء تتبع ميزانيتك.',
    noDesc: 'بدون وصف',
    deleteModalTitle: 'حذف المعاملة؟',
    deleteModalDesc: function(name) { return 'سيتم حذف "' + name + '" نهائياً ولا يمكن استرجاعها.'; },
    deleteBtn: 'حذف',
    cancelBtn: 'إلغاء',
    deleteAria: 'حذف المعاملة'
  },
  en: {
    recentTransactions: 'Recent Transactions',
    addTransaction: '+ Add New Transaction',
    noTransactionsTitle: 'No transactions yet',
    noTransactionsDesc: 'Add your first transaction to start tracking your budget.',
    noDesc: 'No description',
    deleteModalTitle: 'Delete Transaction?',
    deleteModalDesc: function(name) { return '"' + name + '" will be permanently deleted and cannot be recovered.'; },
    deleteBtn: 'Delete',
    cancelBtn: 'Cancel',
    deleteAria: 'Delete transaction'
  }
};

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' }
];

export default function TransactionsPage() {
  const { transactions, deleteTransaction, currency, lang } = useContext(FinanceContext);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);

  const t = tData[lang] || tData.ar;
  const rows = transactions || [];

  const confirmDelete = () => {
    if (pendingDelete) {
      deleteTransaction(pendingDelete.id);
      setPendingDelete(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">{t.recentTransactions}</h1>
        <button 
          type="button"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          <span>{t.addTransaction}</span>
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4 shadow-xl border border-slate-700">
        {rows.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p className="text-lg font-semibold">{t.noTransactionsTitle}</p>
            <p className="text-sm mt-1">{t.noTransactionsDesc}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700/60">
                <div>
                  <h4 className="text-white font-medium">{tx.title || t.noDesc}</h4>
                  <span className="text-xs text-slate-400">{tx.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={tx.type === 'income' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {tx.type === 'income' ? '+' : '-'}{tx.amount} {currency}
                  </span>
                  <button 
                    onClick={() => setPendingDelete(tx)}
                    aria-label={t.deleteAria}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pendingDelete && (
 <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-slate-900">
            <h3 id="delete-title" className="text-lg font-bold">{t.deleteModalTitle}</h3>
            <p className="mt-2 text-sm text-slate-600">
              {typeof t.deleteModalDesc === 'function' 
                ? t.deleteModalDesc(pendingDelete.title || 'item') 
                : ''}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 h-10 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors"
              >
                {t.deleteBtn}
              </button>
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="flex-1 h-10 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium transition-colors"
              >
                {t.cancelBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}