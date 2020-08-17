import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import archievesUploadConfig from '@config/archievesUpload';

import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { check } from 'prettier';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== user_id) {
      throw new AppError('E-mail already in use')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError('You need to set the old password to update your password')
    }



    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old Password doens not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }


    return this.usersRepository.save(user)
  }
}

export default UpdateUserProfileService;
