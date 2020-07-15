import UserTokens from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepositories {
  generate(user_id: string): Promise<UserTokens>;
  findByToken(token: string): Promise<UserTokens | undefined>;
}
