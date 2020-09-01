import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Users from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {};

  public async execute({ user_id }: Request): Promise<Users[]> {
    let users = await this.cacheProvider.recover<Users[]>(`providers-list:${user_id}`)

    if(!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      });

      await this.cacheProvider.save(`providers-list:${user_id}`, classToClass(users));
    }

    return users;
  }
}

export default ListProviderService;
