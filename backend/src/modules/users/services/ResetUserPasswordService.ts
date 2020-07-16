import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepositories';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPassword {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,

    @inject('UserTokensRepository')
    private userTokens: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {};

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokens.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist');
    };

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    user.password = await this.hashProvider.generateHash(password);

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    await this.usersRepository.save(user);
  }
}

export default ResetUserPassword;
