import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Users from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {};

  public async execute({ user_id, name, email, password, old_password }: Request): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    };

    const userWithEmailUsed = await this.usersRepository.findByEmail(email);

    if (userWithEmailUsed && userWithEmailUsed.id !== user.id) {
      throw new AppError('Email already being used.');
    };

    user.name = name;
    user.email = email;

    if(password && !old_password) {
      throw new AppError('To alter password you must inform the old_password');
    };

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password must match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    };

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
