export const tData = {
  ar: {
    retry: 'إعادة المحاولة',
    noTransactionsTitle: 'لا توجد معاملات حتى الآن',
    noResultstTitle: 'لا توجد نتائج مطابقة',
    noTransactionsDesc: 'أضف معاملتك الأولى لبدء تتبع ميزانيتك.',
    noResultsDesc: 'جرب مصطلح بحث آخر أو قم بتغيير الفلتر.',
    noDesc: 'بدون وصف',
    deleteModalTitle: 'حذف المعاملة؟',
    deleteModalDesc: function(name) {
      return 'سيتم حذف "' + name + '" نهائياً ولا يمكن استرجاعها.';
    },
    deleteBtn: 'حذف',
    cancelBtn: 'إلغاء',
    deleteAria: 'حذف المعاملة',
    recentTransactions: 'المعاملات الأخيرة',
    addTransaction: '+ إضافة معاملة جديدة',
    netBalance: 'الرصيد الصافي',
    income: 'الدخل',
    expense: 'المصروف',
    reportsTitle: 'التقارير والتحليلات المالية',
    expenseByCategory: 'تفاصيل المصاريف حسب الفئة'
  },
  en: {
    retry: 'Retry',
    noTransactionsTitle: 'No transactions yet',
    noResultstTitle: 'No matching results',
    noTransactionsDesc: 'Add your first transaction to start tracking your budget.',
    noResultsDesc: 'Try another search term or change the filter.',
    noDesc: 'No description',
    deleteModalTitle: 'Delete Transaction?',
    deleteModalDesc: function(name) {
      return '"' + name + '" will be permanently deleted and cannot be recovered.';
    },
    deleteBtn: 'Delete',
    cancelBtn: 'Cancel',
    deleteAria: 'Delete transaction',
    recentTransactions: 'Recent Transactions',
    addTransaction: '+ Add New Transaction',
    netBalance: 'Net Balance',
    income: 'Income',
    expense: 'Expense',
    reportsTitle: 'Financial Reports & Analytics',
    expenseByCategory: 'Expenses by Category'
  }
};