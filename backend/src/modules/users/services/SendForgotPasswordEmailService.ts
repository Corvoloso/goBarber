import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepositories';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokens: IUserTokensRepository,
  ) {};

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User with this email does not exist', 400);
    };

    await this.userTokens.generate(user.id);

    this.mailProvider.sendMail(email, 'Sua senha é: 123456');
  }
}

export default SendForgotPasswordEmail;
