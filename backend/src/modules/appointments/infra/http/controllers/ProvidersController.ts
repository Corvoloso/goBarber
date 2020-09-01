import { Request, Response } from "express";
import { container } from 'tsyringe';
import { classToClass } from "class-transformer";

import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class AppointmentsController {
  public async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProviderService);

    const providers = await listProvider.execute({
      user_id,
    });

    return response.status(200).json(classToClass(providers));
  }
};
