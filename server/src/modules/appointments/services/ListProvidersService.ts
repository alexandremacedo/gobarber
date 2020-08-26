import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvicer: ICacheProvider,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {

    let users = await this.cacheProvicer.recover<User[]>(`providers-list:${user_id}`)

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        execept_user_id: user_id,
      });

      console.log('A query fooi feita')

      await this.cacheProvicer.save(`providers-list:${user_id}`, users)
    }

    return users;
  }
}

export default ListProvidersService;
