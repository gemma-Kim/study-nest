import { BadRequestException } from '@nestjs/common';
import { genderType, genderTypeList } from '../dto/updateUserProfile.dto';

export class Gender {
  value: genderType;
  constructor(value: genderType) {
    this.value = value;
    if (value && !genderTypeList.includes(value)) {
      throw new BadRequestException('INVALID_GENDER_TYPE');
    }
  }
}

export class Photo {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}

export class Profile {
  readonly gender: genderType;
  readonly photo: string;
  constructor(gender: Gender, photo: Photo) {
    this.gender = gender.value;
    this.photo = photo.value;

    if (!this.gender && !this.photo) {
      throw new BadRequestException('DOES_NOT_EXIST_PROFILE_DATA');
    }
  }
}

export class UserProfile {
  readonly userId: number;
  readonly gender: genderType;
  readonly photo: string;

  constructor(userId: number, profileData: Profile) {
    this.userId = userId;
    this.gender = profileData.gender;
    this.photo = profileData.photo;
  }
}
