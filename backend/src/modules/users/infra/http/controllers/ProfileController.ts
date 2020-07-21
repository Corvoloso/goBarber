import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class UsersController {
  public async show(request: Request, response: Response) {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const profile = await showProfile.execute({ user_id });

    delete profile.password;

    return response.status(200).json(profile);
  }

  public async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });

    delete user.password;

    return response.status(200).json(user);
  }
}
