import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetUserPasswordService  from '@modules/users/services/ResetUserPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response) {
    const { password, token } = request.body;

    const resetUserPassword = container.resolve(ResetUserPasswordService);

    await resetUserPassword.execute({ token, password });

    return response.status(204).json();
  }
}
