import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update image', async () => {
    const fakeDiskStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar if not authenticated', async () => {
    const fakeDiskStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageProvider
    );

    expect(updateUserAvatar.execute({
      user_id: 'not-an-id',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete image if already existant', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
})
