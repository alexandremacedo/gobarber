import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the avaibles months from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'userid',
      date: new Date(2020, 6, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'userid',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'userid',
      date: new Date(2020, 7, 20, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'userid',
      date: new Date(2020, 7, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      user_id: 'user',
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: false },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
