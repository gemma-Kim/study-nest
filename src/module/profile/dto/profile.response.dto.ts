import { Profile } from '../domain/entity/profile.entity';

export class ProfileResponseDto {
  readonly id: number;
  readonly userId: number;
  readonly photo: string | null;
  readonly gender: null | 'MAN' | 'WOMAN';
  readonly createAt: string;

  constructor(profileData: Profile) {
    this.id = profileData.id;
    this.userId = profileData.userId;
    this.photo = profileData.photo;
    this.gender = profileData.gender;
    this.createAt = profileData.createAt;
  }
}
