import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { IUserRepository, UserRepository } from '../repository/user.reposiory';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async exists(userData: {
    id?: number;
    email?: string;
    nickname?: string;
  }): Promise<User> {
    return await this.userRepository.Find({
      where: [
        { id: userData.id },
        { email: userData.email },
        { nickname: userData.nickname },
      ],
    });
  }
}
