import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ type, title, value }: Request): Transaction {
    const createdTransaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(createdTransaction);

    return createdTransaction;
  }
}

export default TransactionsRepository;
