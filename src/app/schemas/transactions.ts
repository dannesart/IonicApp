export interface ITransaction {
  amount: number;
  message: string;
  type: TransactionType;
  errorReason?: string;
  concept?: string;
  iban?: string;
  status: string;
  date: string;
  from: any;
  to: any;
}

export enum TransactionType {
  withdraw = "withdraw",
  deposit = "deposit",
  hold = "hold",
  waiting = "waiting",
}
