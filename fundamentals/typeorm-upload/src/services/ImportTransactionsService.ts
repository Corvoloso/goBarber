import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';

import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

interface Request {
  filename: string;
}

type Csv = [string, 'income' | 'outcome', number, string];

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();
    const csvFilePath = path.resolve(uploadConfig.directory, filename);

    async function loadCSV(filePath: string) {
      const readCSVStream = fs.createReadStream(filePath);

      const parseStream = csvParse({
        from_line: 2,
        ltrim: true,
        rtrim: true,
      });

      const parseCSV = readCSVStream.pipe(parseStream);

      const lines: Array<Csv> = [];

      parseCSV.on('data', line => {
        lines.push(line);
      });

      await new Promise(resolve => {
        parseCSV.on('end', resolve);
      });

      return lines;
    }

    const destructuredCsv = await loadCSV(csvFilePath);

    const transactions: Transaction[] = [];

    destructuredCsv.map(async ([title, type, value, category]) => {
      const transaction = await createTransaction.execute({
        title,
        value,
        type,
        category,
      });

      transactions.push(transaction);
    });
  }
}

export default ImportTransactionsService;
