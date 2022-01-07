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
import { UserUpadateCommand } from '../command/user.command';

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

    const signUpedUser = await this.userRepository.Create({
      email: user.email,
      password: hashedPassword.value,
      nickname: user.nickname,
    });

    return new JoinResponseDto(signUpedUser);
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
    @Body() updateData: UpdateUserInfoRequestDto,
    @Param('userId') userId: number,
  ): Promise<updateUserInfoResponseDto> {
    const user = await this.userService.exists({ id: userId });
    if (!user) {
      throw new NotFoundException('DOES_NOT_EXIST_USER');
    }

    const updatedUser = await this.userRepository.Update(
      new UserUpadateCommand(user.id, updateData),
    );
    return new updateUserInfoResponseDto(updatedUser);
  }
}
