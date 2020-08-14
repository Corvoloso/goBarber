import { injectable, inject } from 'tsyringe';
import path from 'path';

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

    const { token } = await this.userTokens.generate(user.id);

    const templatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Esqueceu sua senha?',
      templateData: {
        file: templatePath,
        variables: {
          token,
          name: user.name,
          link: `${process.env.APP_WEB_URL}/forgot_password?token=${token}`
        }
      }
    });
  }
}

export default SendForgotPasswordEmail;
