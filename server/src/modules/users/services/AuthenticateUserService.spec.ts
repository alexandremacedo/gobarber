import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthenticateUser from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUser;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUser(
      fakeUsersRepository, fakeHashProvider
    );

    createUserService = new CreateUserService(
      fakeUsersRepository, fakeHashProvider,
    );
  })

  it('should be able to create a new authentication', async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUser(
      fakeUsersRepository, fakeHashProvider
    );

    createUserService = new CreateUserService(
      fakeUsersRepository, fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });

    const auth = await authenticateUserService.execute({
      email: 'john@gmail.com',
      password: '123456'
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate', async () => {
    await expect(authenticateUserService.execute({
      email: 'john@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to authenticate with wrong password', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });

    await expect(authenticateUserService.execute({
      email: 'john@gmail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });



});
