import { CreateProfileRequestDto } from '../../dto/profile.request.dto';
import { genderType } from '../../type/profile.type';
import { Gender, Photo } from '../value-object/profile.value-object';

export class Profile {
  protected id: number;

  userId: number;

  photo: string;

  gender: genderType;

  // set _id(id: number) {
  //   this.id = id;
  // }

  // set _userId(userId: number) {
  //   this.userId = userId;
  // }

  // set _photo(photo: string) {
  //   this.photo = new Photo(photo).value;
  // }

  // set _gender(gender: genderType) {
  //   this.gender = new Gender(gender).value;
  // }

  setNewProfile(userId: number, photo: string, gender: genderType) {
    this.userId = userId;
    this.photo = new Photo(photo).value;
    this.gender = new Gender(gender).value;
  }
}
