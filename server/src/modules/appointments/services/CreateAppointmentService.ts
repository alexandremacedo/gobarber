import { startOfHour, isBefore, getHours, format } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) { }

  public async execute({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmetDate = startOfHour(date);

    if (isBefore(appointmetDate, Date.now())) {
      throw new AppError('You can not create an appointment on past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an apoointment with yourself');
    }

    if (getHours(appointmetDate) < 8 || getHours(appointmetDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmetDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmetDate,
    });

    const dateFomatted = format(appointmetDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFomatted}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
