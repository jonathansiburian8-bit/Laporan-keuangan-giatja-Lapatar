import React, { useState } from 'react';
import { Transaction, TransactionType, ExpenseCategory, IncomeCategory } from '../types';
import { PlusCircle } from 'lucide-react';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    // Reset form partially
    setAmount('');
    setDescription('');
  };

  const categories = type === TransactionType.EXPENSE ? Object.values(ExpenseCategory) : Object.values(IncomeCategory);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600" />
        Tambah Transaksi
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Type Toggle */}
        <div className="lg:col-span-1">
          <label className="block text-xs font-medium text-slate-500 mb-1">Tipe</label>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                type === TransactionType.INCOME ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Pemasukan
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                type === TransactionType.EXPENSE ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Pengeluaran
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">Jumlah (Rp)</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              required
            />
        </div>

        {/* Category */}
        <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              required
            >
              <option value="" disabled>Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
        </div>

         {/* Date */}
         <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              required
            />
        </div>

        {/* Submit */}
        <div className="lg:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm shadow-indigo-200"
            >
              Simpan
            </button>
        </div>
        
        {/* Description (Full Width) */}
        <div className="lg:col-span-5">
            <label className="block text-xs font-medium text-slate-500 mb-1">Deskripsi (Opsional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Makan siang di warteg, Gaji bulan ini..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
        </div>
      </form>
    </div>
  );
};