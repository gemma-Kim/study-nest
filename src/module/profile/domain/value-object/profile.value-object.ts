import { BadRequestException } from '@nestjs/common';
import { genderType, genderTypeList } from '../../type/profile.type';

export class Gender {
  constructor(readonly value: string) {
    if (value && !genderTypeList.includes(value)) {
      throw new BadRequestException('INVALID_GENDER_TYPE');
    }
  }
}

export class Photo {
  constructor(readonly value: string) {
    this.value = value;
  }
}

export class UserProfile {
  constructor(
    readonly id: number,
    readonly gender: genderType,
    readonly photo: string,
  ) {
    this.id = id;
    this.gender = new Gender(gender).value;
    this.photo = new Photo(gender).value;
  }
}
