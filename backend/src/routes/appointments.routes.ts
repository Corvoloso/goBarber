import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentsService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentRouter;
