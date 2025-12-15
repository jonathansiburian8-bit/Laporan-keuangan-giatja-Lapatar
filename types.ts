export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}

export enum ExpenseCategory {
  PANGKAS = 'Pangkas',
  MENJAHIT = 'Menjahit',
  DOORSMEER = 'Doorsmeer',
  GREENHOUSE = 'Greenhouse',
  PERTANIAN_LT = 'Pertanian LT',
  TENUN = 'Tenun',
  KANTOR = 'Kantor',
  LAS = 'Las',
  MINIATUR = 'Miniatur',
  BAKERY = 'Bakery',
  LAUNDRY = 'Laundry'
}

export enum IncomeCategory {
  PANGKAS = 'Pangkas',
  MENJAHIT = 'Menjahit',
  DOORSMEER = 'Doorsmeer',
  GREENHOUSE = 'Greenhouse',
  PERTANIAN_LT = 'Pertanian LT',
  TENUN = 'Tenun',
  KANTOR = 'Kantor',
  LAS = 'Las',
  MINIATUR = 'Miniatur',
  BAKERY = 'Bakery',
  LAUNDRY = 'Laundry'
}

export interface AIAnalysisResult {
  summary: string;
  advice: string;
  timestamp: number;
}