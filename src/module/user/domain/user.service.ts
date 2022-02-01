import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { IUserRepository, UserRepository } from '../repository/user.reposiory';
import { FindUserDto } from '../dto/user.dto';
import { UserCreateCommand, UserUpadateCommand } from '../command/user.command';
import {
  JoinResponseDto,
  updateUserInfoResponseDto,
} from '../dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async exists(data: FindUserDto): Promise<User> {
    return await this.userRepository.Find({
      where: [
        { id: data.id },
        { email: data.email },
        { nickname: data.nickname },
      ],
    });
  }

  async createUser(
    userCreateCommand: UserCreateCommand,
  ): Promise<JoinResponseDto> {
    const foundUser = await this.exists(userCreateCommand);
    if (foundUser) {
      throw new BadRequestException('DUPLICATED_EMAIL_OR_NICKNAME');
    }

    const newUser = await this.userRepository.Create(userCreateCommand);
    return new JoinResponseDto(newUser);
  }

  async updateUser(
    userUpadateCommand: UserUpadateCommand,
  ): Promise<updateUserInfoResponseDto> {
    const updatedUser = await this.userRepository.Update(userUpadateCommand);
    return new updateUserInfoResponseDto(updatedUser);
  }
}
