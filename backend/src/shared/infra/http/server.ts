import 'reflect-metadata';
import 'dotenv/config';

import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes/index';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'Error', error: err.message });
  }

  return response.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333!');
});
