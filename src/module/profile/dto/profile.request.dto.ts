import {
  IsDefined,
  IsOptional,
  IsEnum,
  IsInt,
  IsString,
  Min,
} from 'class-validator';
import { orderByType, orderByTypeList } from 'src/common/type/repository.type';
import { ApiProperty } from '@nestjs/swagger';
import { genderType, genderTypeList } from '../type/profile.type';

export class CreateProfileRequestDto {
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

export class SearchProfileRequestDto {
  @IsDefined()
  @IsOptional()
  @Min(1)
  @IsInt()
  @ApiProperty({
    example: 1,
    description: '프로필 ID',
    required: false,
  })
  id?: number;

  @IsDefined()
  @IsOptional()
  @IsEnum(genderTypeList)
  @ApiProperty({
    example: 'MAN',
    description: '성별',
    required: false,
  })
  gender?: genderType;

  @IsDefined()
  @IsOptional()
  @IsInt()
  @ApiProperty({
    example: 1,
    description: '성별',
    required: false,
  })
  userId?: number;

  @IsDefined()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 1,
    description: '성별',
    required: false,
  })
  fromCreateAt?: string;

  @IsDefined()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 1,
    description: '성별',
    required: false,
  })
  toCreateAt?: string;

  @IsDefined()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 1,
    description: '성별',
    required: false,
  })
  fromUpdateeAt?: string;

  @IsDefined()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 1,
    description: '성별',
    required: false,
  })
  toUpdateAt?: string;

  @IsDefined()
  @IsOptional()
  @IsEnum(orderByTypeList)
  @ApiProperty({
    example: 1,
    description: '성별',
    required: false,
  })
  order?: orderByType;
}

export class RequestUpdateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 1,
    description: '사진 URL',
    required: false,
  })
  photo?: string;

  @IsOptional()
  @IsEnum(genderTypeList)
  @ApiProperty({
    example: 1,
    description: '성별',
    required: false,
  })
  gender?: genderType;
}
