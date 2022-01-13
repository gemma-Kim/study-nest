import { BadRequestException } from '@nestjs/common';
import { genderType } from '../../type/profile.type';
import { Gender, Photo } from '../value-object/profile.value-object';

export class UpdateProfileCommand {
  constructor(
    readonly id: number,
    readonly photo?: string,
    readonly gender?: genderType,
  ) {
    if (!id) throw new BadRequestException();
    if (!photo && !gender) throw new BadRequestException();

    this.id = id;
    if (photo) this.photo = new Photo(photo).value;
    if (gender) this.gender = new Gender(gender).value;
  }
}
