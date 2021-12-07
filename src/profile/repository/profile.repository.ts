import { EntityRepository, Repository } from 'typeorm';
import { Profile } from 'src/profile/entity/profile.entity';
import { NewProfileResponseDto } from '../dto/getProfile.response.dto';
import { NewProfileRequestDto } from '../dto/newProfile.request.dto';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async getProfile(profileData: getProfileDto): Promise<Profile[]> {
    return await this.find({ where: profileData });
  }

  async getUserProfile(userId: number): Promise<Profile> {
    return await this.findOne({ where: { userId } });
  }

  async addNewProfile(newProfile) {}
}
