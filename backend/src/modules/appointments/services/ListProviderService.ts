import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';

import Users from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,
  ) {};

  public async execute({ user_id }: Request): Promise<Users[]> {
    const user = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    });

    return user;
  }
}

export default ListProviderService;
