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

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = this.userTokens.find(findToken => findToken.token === token);

    return userToken;
  }
}

export default FakeUserTokensRepository;
