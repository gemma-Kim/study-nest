import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNull.interceptor';
import { JoinRequestDto } from '../dto/join.request.dto';
import { UserService } from './user.service';
import { Email, Nickname, Password, User } from '../domain/user.domain';
import { JoinResponseDto } from '../dto/user.response.dto';
import { LogInRequestDto } from '../dto/user.request.dto';
import { AuthService } from 'src/module/auth/application/auth.service';
import { UserRepository } from '../entity/user.reposiory';
import { AuthPayload } from 'src/module/auth/dto/auth.payload.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('signUp')
  async signUp(@Body() data: JoinRequestDto): Promise<JoinResponseDto> {
    const user = new User(
      new Email(data.email),
      new Password(data.password),
      new Nickname(data.nickname),
    );
    const foundUser = await this.userService.exists(user);
    if (foundUser) {
      throw new BadRequestException('이미 존재하는 사용자 이메일 혹은 닉네임');
    }

    const hashedPassword = this.authService.hashPassword(
      new Password(user.password),
    );

    const signUpedNewUser = await this.userRepository.saveUser({
      email: user.email,
      password: hashedPassword,
      nickname: user.nickname,
    });

    return new JoinResponseDto(signUpedNewUser);
  }

  @Post('login')
  async logIn(@Body() data: LogInRequestDto) {
    const userData: User = await this.userRepository.findOne({
      email: data.email,
    });

    if (!userData) {
      throw new NotFoundException();
    }

    const user = new User(
      new Email(userData.email),
      new Password(userData.password),
      new Nickname(userData.nickname),
    );

    await this.authService.validatePassword(
      new Password(data.password),
      new Password(user.password),
    );

    return this.authService.generateAccessToken(
      new AuthPayload({
        id: user.id,
        email: user.email,
      }),
    );
  }
}
