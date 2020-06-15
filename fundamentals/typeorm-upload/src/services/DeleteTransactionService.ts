import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Transactions from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transactions);

    await transactionsRepository.delete({
      id,
    });
  }
}

export default DeleteTransactionService;
