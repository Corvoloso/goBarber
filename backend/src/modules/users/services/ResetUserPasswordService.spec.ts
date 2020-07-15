import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetUserPasswordService from './ResetUserPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

let resetUserPasswordService: ResetUserPasswordService;

describe('ResetUserPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetUserPasswordService = new ResetUserPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  })

  it('should be able to reset user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetUserPasswordService.execute({
      token,
      password: '123123'
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith(updatedUser?.password);
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset user password with non-existant token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(resetUserPasswordService.execute({
      token: 'non-existant-token',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset user password with non-existant user', async () => {
    expect(resetUserPasswordService.execute({
      token,
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });
});
