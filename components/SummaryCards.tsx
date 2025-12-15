import React, { useMemo } from 'react';
import { Transaction, TransactionType } from '../types';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions }) => {
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === TransactionType.INCOME) {
        income += t.amount;
      } else {
        expense += t.amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Balance */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-200">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-indigo-100 text-sm font-medium">Saldo Saat Ini</span>
        </div>
        <h2 className="text-3xl font-bold mb-1">Rp {balance.toLocaleString('id-ID')}</h2>
        <p className="text-indigo-100 text-xs opacity-80">Total Sisa Uang</p>
      </div>

      {/* Income */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-slate-500 text-sm font-medium">Pemasukan</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Rp {totalIncome.toLocaleString('id-ID')}</h2>
        <p className="text-emerald-600 text-xs font-medium flex items-center">
            Total Pemasukan Tercatat
        </p>
      </div>

      {/* Expense */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-rose-100 p-2 rounded-lg">
            <TrendingDown className="w-6 h-6 text-rose-600" />
          </div>
          <span className="text-slate-500 text-sm font-medium">Pengeluaran</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Rp {totalExpense.toLocaleString('id-ID')}</h2>
        <p className="text-rose-600 text-xs font-medium flex items-center">
            Total Pengeluaran Tercatat
        </p>
      </div>
    </div>
  );
};