import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const profileController = new ProfileController();
const profileRouter = Router();

profileRouter.get('/', ensureAuthenticated, profileController.show);

profileRouter.put('/', ensureAuthenticated, profileController.update);

export default profileRouter;
