import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    createUserService = new CreateUserService(
      fakeUsersRepository, fakeHashProvider, fakeCacheProvider
    );
  })

  it('should be able to create a new user', async () => {

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email address', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
