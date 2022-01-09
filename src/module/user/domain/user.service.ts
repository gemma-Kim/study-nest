import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { IUserRepository, UserRepository } from '../repository/user.reposiory';
import { HashedPassword, Password } from './user.domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async exists(userData): Promise<User> {
    return await this.userRepository.Find({
      where: [
        { id: userData.id },
        { email: userData.email },
        { nickname: userData.nickname },
      ],
    });
  }

  async hashPassword(password: Password): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const pwValue = password.value;
    return new HashedPassword(await bcrypt.hash(pwValue, salt)).value;
  }
}
