import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository, UserRepository } from '../repository/user.reposiory';
import { User } from './user.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async exists(user: User) {
    return this.userRepository.Find({
      where: [
        { id: user.id },
        { email: user.email },
        { nickname: user.nickname },
      ],
    });
  }
}
