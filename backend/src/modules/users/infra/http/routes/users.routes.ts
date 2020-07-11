import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', usersController.create);

userRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default userRouter;
