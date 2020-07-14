import { uuid } from 'uuidv4';

import IUserTokensRepositories from '@modules/users/repositories/IUserTokensRepositories';

import UserTokens from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepositories {
  private userTokens: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {
    const token = new UserTokens();

    Object.assign(token, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(token);

    return token;
  }
}

export default FakeUserTokensRepository;
