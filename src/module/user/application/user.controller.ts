import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNull.interceptor';
import { JoinRequestDto } from '../dto/join.request.dto';
import { UserService } from './user.service';
import { Email, Nickname, Password, User } from '../domain/user.domain';
import { JoinResponseDto } from '../dto/user.response.dto';
import { LogInRequestDto } from '../dto/user.request.dto';
import { AuthService } from 'src/module/auth/application/auth.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('signUp')
  async signUp(@Body() data: JoinRequestDto): Promise<JoinResponseDto> {
    const email = new Email(data.email);
    const password = new Password(data.password);
    const nickname = new Nickname(data.nickname);
    const user = new User(email, password, nickname);
    return await this.userService.signUp(user);
  }

  @Post('login')
  async logIn(@Body() data: LogInRequestDto) {
    const email = new Email(data.email);
    const password = new Password(data.password);

    return await this.authService.validateUser(email, password);
  }
}
