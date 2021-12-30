import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../entity/user.reposiory';
import { JoinResponseDto } from '../dto/user.response.dto';
import { Nickname, Password, User } from '../domain/user.domain';
import { AuthService } from 'src/module/auth/application/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async exists(user: User) {
    return this.userRepository.findOne({
      where: user,
    });
  }
}
