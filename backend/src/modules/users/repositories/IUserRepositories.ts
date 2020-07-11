import Users from '@modules/users/infra/typeorm/entities/Users';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUserRepositories {
  findByEmail(email: string): Promise<Users | undefined>;
  findById(id: string): Promise<Users | undefined>;
  create(data: ICreateUserDTO): Promise<Users>;
  save(user: Users): Promise<Users>;
}
