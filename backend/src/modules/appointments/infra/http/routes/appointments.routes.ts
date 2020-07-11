import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointmentRepository = getCustomRepository(AppointmentRepository);
//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
