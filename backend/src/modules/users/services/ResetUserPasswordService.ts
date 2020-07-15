import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepositories';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class CreateUserService {
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

    await this.usersRepository.save(user);
  }
}

export default CreateUserService;
