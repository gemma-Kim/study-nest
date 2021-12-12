import { IsEnum, IsInt, IsString } from 'class-validator';
import { Profile } from '../entity/profile.entity';

const gender = ['WOMAN', 'MAN'] as const;
type genderType = typeof gender[number];

export class UpdateUserProfileDto {
  @IsString()
  email?: string;

  @IsString()
  photo?: string;

  @IsEnum(gender)
  gender?: genderType;
}

export class addNewProfileDto {
  @IsString()
  photo?: string;

  @IsEnum(gender)
  gender?: genderType;
}

export class RequestUpdateProfileDto {
  @IsString()
  email?: string;

  @IsString()
  photo?: string;

  @IsEnum(gender)
  gender?: genderType;
}
