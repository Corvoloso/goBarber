import { getRepository, Repository, Not } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import IUsersRepository from '@modules/users/repositories/IUserRepositories';

import Users from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<Users[]> {
    let users: Users[];

    if(except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    return await this.ormRepository.findOne({ where: { email } });
  }

  public async findById (id: string): Promise<Users | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async create(userData: ICreateUserDTO): Promise<Users> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Users): Promise<Users> {
    return await this.ormRepository.save(user);
  }
}

export default UsersRepository;
