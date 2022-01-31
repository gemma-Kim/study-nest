import {
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
import { AccessToken } from 'src/module/auth/domain/auth.domain';
import { UserCreateCommand, UserUpadateCommand } from '../command/user.command';
import {
  Email,
  Nickname,
  Password,
} from '../domain/value-object/user.value-object';

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
    const password = new Password(data.password);
    await password.hash();

    const userCreateCommand = new UserCreateCommand(
      new Email(data.email).value,
      password.value,
      new Nickname(data.nickname).value,
    );

    return await this.userService.createUser(userCreateCommand);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  async login(@Body() data: LogInRequestDto): Promise<AccessToken> {
    const user = await this.userService.exists({ email: data.email });
    if (!user) {
      throw new NotFoundException('DOES_NOT_EXIST_USER');
    }

    await user.checkPassword(data.password);
    return this.authService.generateAccessToken(user.id, data.email);
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
    user.updateInfo(updateData);

    const updatedUser = await this.userRepository.Update(
      new UserUpadateCommand(user),
    );
    return new updateUserInfoResponseDto(updatedUser);
  }
}
