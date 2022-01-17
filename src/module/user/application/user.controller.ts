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
import { UserUpadateCommand } from '../command/user.command';
import { User } from '../domain/entity/user.entity';

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
    const newUser = await new User().getSignUpUser(
      data.email,
      data.password,
      data.nickname,
    );

    const foundUser = await this.userService.exists(newUser);
    if (foundUser) {
      throw new BadRequestException('DUPLICATED_EMAIL_OR_NICKNAME');
    }

    const createdUser = await this.userRepository.Create(newUser);
    return new JoinResponseDto(createdUser);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  async login(@Body() data: LogInRequestDto): Promise<AccessToken> {
    const user = new User().getLoginUser(data.email, data.password);
    const foundUser = await this.userService.exists(user);

    if (!foundUser) {
      throw new NotFoundException('DOES_NOT_EXIST_USER');
    }
    await user.checkPassword(user.password);
    return this.authService.generateAccessToken(user.id, user.email);
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
      new UserUpadateCommand({ id: userId, ...updateData }),
    );
    return new updateUserInfoResponseDto(updatedUser);
  }
}
