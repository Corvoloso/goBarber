import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';

import Users from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,

  ) {};

  public async execute({ user_id }: Request): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    };

    return user;
  }
}

export default UpdateProfileService;
