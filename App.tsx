import React, { useState, useEffect } from 'react';
import { Transaction } from './types';
import { getStoredTransactions, saveStoredTransactions } from './services/storageService';
import { SummaryCards } from './components/SummaryCards';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { FinancialCharts } from './components/FinancialCharts';
import { AIAdvisor } from './components/AIAdvisor';
import { LoginForm } from './components/LoginForm';
import { LayoutDashboard, LogOut } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Check session storage on load
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('giatja_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    if (isAuthenticated) {
      const loaded = getStoredTransactions();
      setTransactions(loaded);
    }
  }, [isAuthenticated]);

  // Save data on change
  useEffect(() => {
    if (isAuthenticated) {
      saveStoredTransactions(transactions);
    }
  }, [transactions, isAuthenticated]);

  const handleLogin = (u: string, p: string): boolean => {
    if (u === 'Giatjakitabisa' && p === 'akupadamu888') {
      setIsAuthenticated(true);
      sessionStorage.setItem('giatja_auth', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('giatja_auth');
  };

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [...prev, transaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
                <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Laporan Keuangan Giatja</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-slate-500">
              Admin Akses
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Top Summary Stats */}
        <SummaryCards transactions={transactions} />

        {/* AI Advisor Section */}
        <AIAdvisor transactions={transactions} />

        {/* Charts & Graphs */}
        <FinancialCharts transactions={transactions} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            
            {/* Simple Tip Card */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hidden xl:block">
                <h4 className="font-semibold text-indigo-900 mb-2">💡 Tips Usaha</h4>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    Catat setiap pemasukan dan pengeluaran dari setiap unit usaha secara terperinci. Gunakan fitur AI untuk menganalisis unit mana yang paling menguntungkan.
                </p>
            </div>
          </div>

          {/* List Section */}
          <div className="xl:col-span-2">
            <TransactionList 
                transactions={transactions} 
                onDelete={handleDeleteTransaction} 
            />
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;