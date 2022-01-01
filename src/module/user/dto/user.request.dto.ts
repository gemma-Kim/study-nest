import { IsString } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly nickname: string;
}

export class LogInRequestDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfo {
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
