import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Users from '@modules/users/infra/typeorm/entities/Users';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {};

  public async execute({ user_id, avatarFilename }: Request): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
