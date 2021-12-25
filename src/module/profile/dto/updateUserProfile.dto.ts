import { IsEnum, IsInt, IsString } from 'class-validator';

export const genderTypeList = ['WOMAN', 'MAN'] as const;
export type genderType = typeof genderTypeList[number];

export class UpdateUserProfileDto {
  @IsString()
  email?: string;

  @IsString()
  photo?: string;

  @IsEnum(genderTypeList)
  gender?: genderType;
}

export class addNewProfileDto {
  @IsString()
  photo?: string;

  @IsEnum(genderTypeList)
  gender?: genderType;
}

export class RequestUpdateProfileDto {
  @IsString()
  photo?: string;

  @IsEnum(genderTypeList)
  gender?: genderType;
}
