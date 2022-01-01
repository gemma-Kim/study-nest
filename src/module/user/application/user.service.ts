import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../entity/user.reposiory';
import { User } from '../domain/user.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async exists(user: User) {
    return this.userRepository.findOne({
      where: [
        { id: user.id },
        { nickname: user.nickname },
        { email: user.email },
      ],
    });
  }
}
