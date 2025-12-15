import React from 'react';
import { Transaction, TransactionType } from '../types';
import { ArrowUpRight, ArrowDownRight, Trash2, Calendar } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  // Sort by date descending
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-100 border-dashed">
        <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6 text-slate-400" />
        </div>
        <p className="text-slate-500">Belum ada transaksi.</p>
        <p className="text-sm text-slate-400">Mulai tambahkan catatan keuangan Anda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">Riwayat Transaksi</h3>
            <span className="text-xs text-slate-500">{transactions.length} entri</span>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-medium">Tanggal</th>
              <th className="px-6 py-3 font-medium">Kategori</th>
              <th className="px-6 py-3 font-medium">Deskripsi</th>
              <th className="px-6 py-3 font-medium text-right">Jumlah</th>
              <th className="px-6 py-3 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-3 text-slate-600 whitespace-nowrap">
                  {new Date(t.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    t.type === TransactionType.INCOME 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-3 text-slate-800 max-w-xs truncate">{t.description || '-'}</td>
                <td className={`px-6 py-3 text-right font-semibold whitespace-nowrap ${
                  t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  <div className="flex items-center justify-end gap-1">
                    {t.type === TransactionType.INCOME ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    Rp {t.amount.toLocaleString('id-ID')}
                  </div>
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-50 opacity-0 group-hover:opacity-100"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};