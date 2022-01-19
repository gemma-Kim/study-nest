import { BadRequestException } from '@nestjs/common';
import { genderType, genderTypeList } from '../../type/profile.type';

export class Gender {
  constructor(readonly value: genderType) {
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
