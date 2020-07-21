import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('Authentication', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const authenticate = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toHaveProperty('id');
  });

  it('should not be able to authenticate with non existant user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com.br',
        password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '12345'
    })).rejects.toBeInstanceOf(AppError);
  });
})
