import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

// import Users from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {};

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Sua senha é: 123456');
  }
}

export default CreateUserService;
