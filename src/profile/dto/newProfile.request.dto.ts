import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Profile } from '../entity/profile.entity';

export class NewProfileRequestDto {
  @IsOptional()
  @ApiProperty({
    example: 'email123@naver.com',
    description: '이메일',
    required: true,
  })
  readonly photo?: string;

  @IsOptional()
  @ApiProperty({ example: '12345678', description: '비밀번호', required: true })
  readonly gender?: string;
}
