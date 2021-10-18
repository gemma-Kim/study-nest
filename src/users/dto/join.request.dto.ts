import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'email123@naver.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({ example: '12345678', description: '비밀번호', required: true })
  public password: string;

  @ApiProperty({ example: 'gemma', description: '닉네임', required: true })
  public nickname: string;
}
