import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { Profile } from '../entity/profile.entity';
import { genderType, genderTypeList } from './updateUserProfile.dto';

export class NewProfileRequestDto {
  @IsDefined()
  @IsOptional()
  @ApiProperty({
    example: 'email123@naver.com',
    description: '사진 URL',
    required: true,
  })
  readonly photo: string;

  @IsDefined()
  @IsEnum(genderTypeList)
  @IsOptional()
  @ApiProperty({ example: 'WOMAN', description: '성별', required: false })
  readonly gender: genderType;
}
