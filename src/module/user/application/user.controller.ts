import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNull.interceptor';
import { JoinRequestDto } from '../dto/join.request.dto';
import { UpdateUserInfo } from '../dto/updateUserInfo.request.dto';
import { UserService } from './user.service';
import { Email, Nickname, Password, User } from '../domain/user.domain';
import { JoinResponseDto } from '../dto/user.response.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
