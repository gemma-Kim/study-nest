import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../entity/user.reposiory';
import { JoinResponseDto } from '../dto/user.response.dto';
import { User } from '../domain/user.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async signUp(userData: User) {
    const saltRounds: number = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = bcrypt.hash(userData.password, salt);
    const signUpedNewUser = await this.userRepository.saveUser({
      email: userData.email,
      password: hashedPassword,
      nickname: userData.nickname,
    });
    return new JoinResponseDto(signUpedNewUser);
  }
}
