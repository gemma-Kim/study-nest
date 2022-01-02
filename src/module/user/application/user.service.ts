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

  async exists(userData) {
    let where = [];

    if (userData.id) where.push({ id: userData.id });
    if (userData.nickname) where.push({ nickname: userData.nickname });
    if (userData.email) where.push({ email: userData.email });

    return this.userRepository.findOne({
      where,
    });
  }
}
