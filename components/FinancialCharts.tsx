import React, { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { Transaction, TransactionType } from '../types';

interface FinancialChartsProps {
  transactions: Transaction[];
}

// Expanded color palette for more categories
const COLORS = [
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F43F5E', // Rose
  '#84CC16', // Lime
  '#0EA5E9', // Sky
  '#64748B'  // Slate
];

export const FinancialCharts: React.FC<FinancialChartsProps> = ({ transactions }) => {
  
  // Prepare Data for Pie Chart (Expenses by Category)
  const expenseData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE);
    const grouped: Record<string, number> = {};
    
    expenses.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = 0;
      grouped[t.category] += t.amount;
    });

    return Object.keys(grouped).map((key) => ({
      name: key,
      value: grouped[key]
    })).sort((a, b) => b.value - a.value); // Sort biggest expenses first
  }, [transactions]);

  // Prepare Data for Pie Chart (Income by Category)
  const incomeData = useMemo(() => {
    const incomes = transactions.filter(t => t.type === TransactionType.INCOME);
    const grouped: Record<string, number> = {};
    
    incomes.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = 0;
      grouped[t.category] += t.amount;
    });

    return Object.keys(grouped).map((key) => ({
      name: key,
      value: grouped[key]
    })).sort((a, b) => b.value - a.value); // Sort biggest income first
  }, [transactions]);

  // Prepare Data for Bar Chart (Last 6 Months Income vs Expense)
  const monthlyData = useMemo(() => {
    const data: Record<string, { name: string; Income: number; Expense: number }> = {};
    
    // Sort transactions by date first
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sorted.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const name = date.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });

      if (!data[key]) {
        data[key] = { name, Income: 0, Expense: 0 };
      }

      if (t.type === TransactionType.INCOME) {
        data[key].Income += t.amount;
      } else {
        data[key].Expense += t.amount;
      }
    });

    // Take last 6 months only
    return Object.values(data).slice(-6);
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center h-64">
        <p className="text-slate-400">Belum ada cukup data untuk menampilkan grafik.</p>
      </div>
    );
  }

  const renderPieChart = (data: {name: string, value: number}[], title: string, emptyMessage: string) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="h-64 w-full relative">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
            {emptyMessage}
          </div>
        )}
      </div>
      {data.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {data.slice(0, 5).map((entry, index) => (
                  <div key={entry.name} className="flex items-center text-xs text-slate-600">
                      <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length]}}></span>
                      {entry.name}
                  </div>
              ))}
          </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Breakdown */}
        {renderPieChart(incomeData, "Pemasukan per Unit Usaha", "Belum ada data pemasukan")}
        
        {/* Expense Breakdown */}
        {renderPieChart(expenseData, "Pengeluaran per Unit Usaha", "Belum ada data pengeluaran")}
      </div>

      {/* Monthly Trend */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Tren Bulanan</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis hide />
              <Tooltip 
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="Income" name="Pemasukan" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expense" name="Pengeluaran" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};