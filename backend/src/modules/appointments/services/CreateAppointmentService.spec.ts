import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/fakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository
let fakeCacheProvider: FakeCacheProvider

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 12).getTime()
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 18, 14),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointments at the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 11).getTime()
    });

    const appointmentDate = new Date(2020, 4, 18, 17);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'provider-id',
        provider_id: 'user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 18, 11),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on with same user id', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 18, 13),
        user_id: 'user-id',
        provider_id: 'user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an apointment if not between 8am and 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 3).getTime()
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 18, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
    })).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 18, 18),
        user_id: 'user-id2',
        provider_id: 'provider-id2',
    })).rejects.toBeInstanceOf(AppError);
  });
})
