import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Profile } from '../entity/profile.entity';

export class NewProfileDto extends OmitType(Profile, [
  'id',
  'userId',
  'createAt',
  'updateAt',
]) {
  @ApiProperty({
    example: 'email123@naver.com',
    description: '이메일',
    required: true,
  })
  @IsOptional()
  readonly photo: string;

  @IsOptional()
  @ApiProperty({ example: '12345678', description: '비밀번호', required: true })
  readonly gender: string;
}
