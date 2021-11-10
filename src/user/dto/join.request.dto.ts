import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class JoinRequestDto extends OmitType(User, ['id']) {
  @ApiProperty({
    example: 'email123@naver.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({ example: '12345678', description: '비밀번호', required: true })
  public password: string;
}
