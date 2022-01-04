import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNull.interceptor';
import { UserService } from '../domain/user.service';
import {
  Email,
  HashedPassword,
  LoginUser,
  Nickname,
  Password,
  SignupUser,
  User,
} from '../domain/user.domain';
import {
  JoinResponseDto,
  updateUserInfoResponseDto,
} from '../dto/user.response.dto';
import {
  LogInRequestDto,
  SignUpRequestDto,
  UpdateUserInfoRequestDto,
} from '../dto/user.request.dto';
import { AuthService } from 'src/module/auth/application/auth.service';
import { UserRepository } from '../repository/user.reposiory';
import { AuthPayload } from 'src/module/auth/dto/auth.payload.dto';
import { AccessToken } from 'src/module/auth/domain/auth.domain';

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
  async signUp(@Body() data: SignUpRequestDto): Promise<JoinResponseDto> {
    const user = new SignupUser(
      new Email(data.email),
      new Password(data.password),
      new Nickname(data.nickname),
    );
    const foundUser = await this.userService.exists(user);

    if (foundUser) {
      throw new BadRequestException('DUPLICATED_EMAIL_OR_NICKNAME');
    }

    const hashedPassword = new HashedPassword(
      await this.authService.hashPassword(new Password(user.password)),
    );

    const signUpedUser = await this.userRepository.Save({
      email: user.email,
      password: hashedPassword.value,
      nickname: user.nickname,
    });

    return new JoinResponseDto(
      signUpedUser.id,
      signUpedUser.email,
      signUpedUser.nickname,
      signUpedUser.createAt,
    );
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  async logIn(@Body() data: LogInRequestDto): Promise<AccessToken> {
    const loginUser = new LoginUser(
      new Email(data.email),
      new Password(data.password),
    );

    const user = await this.userService.exists(loginUser);

    if (!user) {
      throw new NotFoundException('DOES_NOT_EXIST_USER');
    }

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

  @ApiOperation({
    summary: '사용자 정보 변경',
  })
  @Patch(':userId')
  async updateUserInfo(
    @Body() data: UpdateUserInfoRequestDto,
    @Param() userId: number,
  ): Promise<updateUserInfoResponseDto> {
    const userData = await this.userService.exists({ id: userId });
    if (!userData) {
      throw new NotFoundException('DOES_NOT_EXIST_USER');
    }

    const user = new User(
      userData.id,
      new Email(userData.email),
      new Password(userData.password),
      new Nickname(userData.nickname),
    );

    if (data.email) user.changeEmail(data.email);
    if (data.nickname) user.changeNickname(data.nickname);
    if (data.password) {
      user.changePassword(
        new HashedPassword(
          await this.authService.hashPassword(new Password(data.password)),
        ).value,
      );
    }

    const updatedUser = await this.userRepository.Save(user);

    return new updateUserInfoResponseDto(updatedUser);
  }
}
