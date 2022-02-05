import { ProfileOrmEntity } from '../repository/profile.orm.entity';

export class ProfileResponseDto {
  readonly id: number;
  readonly userId: number;
  readonly photo: string | null;
  readonly gender: null | 'MAN' | 'WOMAN';
  readonly createAt: string;

  constructor(profileData: ProfileOrmEntity) {
    this.id = profileData.id;
    this.userId = profileData.userId;
    this.photo = profileData.photo;
    this.gender = profileData.gender;
    this.createAt = profileData.createAt;
  }
}
