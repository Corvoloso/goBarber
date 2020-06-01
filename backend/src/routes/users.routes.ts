import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import UsersRepository from '../repositories/UsersRepository';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import uploadConfig from '../config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.get('/', async (request, response) => {
  try {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    users.map(user => {
      delete user.password;
    });

    return response.status(200).json(users);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.status(200).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const UpdateUserAvatar = new UpdateUserAvatarService();

    const user = await UpdateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRouter;
