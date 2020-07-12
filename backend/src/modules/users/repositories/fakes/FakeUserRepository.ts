import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUserRepositories';

import Users from '../../infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private users: Users[] = [];

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async findById (id: string): Promise<Users | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<Users> {
    const user = new Users();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
