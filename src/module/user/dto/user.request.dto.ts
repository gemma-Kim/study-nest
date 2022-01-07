import { IsOptional, IsString } from 'class-validator';

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

export class UpdateUserInfoRequestDto {
  @ApiProperty({
    example: 'email123@naver.com',
    description: '이메일',
    required: false,
  })
  @IsOptional()
  @IsString()
  public email?: string;

  @ApiProperty({
    example: '12345678',
    description: '비밀번호',
    required: false,
  })
  @IsOptional()
  @IsString()
  public password?: string;

  @ApiProperty({
    example: '헬로젬마',
    description: '닉네임',
    required: false,
  })
  @IsOptional()
  @IsString()
  public nickname?: string;
}
