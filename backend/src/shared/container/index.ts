import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepositories from '@modules/users/repositories/IUserTokensRepositories';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUserRepositories>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepositories>(
  'UserTokensRepository',
  UserTokensRepository
);
