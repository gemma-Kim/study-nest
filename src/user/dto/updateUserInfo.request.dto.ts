import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from './join.request.dto';

export class UpdateUserInfo extends JoinRequestDto {
  @ApiProperty({
    example: 'email123@naver.com',
    description: '이메일',
    required: false,
  })
  public email: string;

  @ApiProperty({
    example: '12345678',
    description: '비밀번호',
    required: false,
  })
  public password: string;
}
