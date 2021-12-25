import { Profile } from '../entity/profile.entity';

export class NewProfileResponseDto {
  id: number;
  userId: number;
  photo: string | null;
  gender: null | 'MAN' | 'WOMAN';

  constructor(profileData: Profile) {
    this.id = profileData.id;
    this.userId = profileData.userId;
    this.photo = profileData.photo;
    this.gender = profileData.gender;
  }
}
