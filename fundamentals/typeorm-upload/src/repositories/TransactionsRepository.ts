import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getRepository(Transaction);

    const transactions = await transactionsRepository.find();

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

    const outcome = transactions
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
}

export default TransactionsRepository;
