import {
  Connection,
  EntityManager,
  EntityRepository,
  Repository,
} from 'typeorm';
import { Profile } from 'src/profile/entity/profile.entity';
import { NewProfileResponseDto } from '../dto/getProfile.response.dto';
import { NewProfileRequestDto } from '../dto/newProfile.request.dto';
import { Inject } from '@nestjs/common';
import { addNewProfileDto } from '../dto/updateUserProfile.dto';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async getProfile(profileData: getProfileDto): Promise<Profile[]> {
    return await this.find({ where: profileData });
  }

  async getUserProfile(userId: number): Promise<Profile> {
    return await this.findOne({ where: { userId } });
  }

  async createNewProfile(
    newProfile,
    entityManger?: EntityManager,
  ): Promise<Profile> {
    if (entityManger instanceof EntityManager) {
      return await entityManger.save(Profile, newProfile);
    }
    return await this.save(newProfile);
  }

  async updateProfile(
    entityManger: EntityManager,
    profileId: number,
    updateDto: addNewProfileDto,
  ) {
    return await entityManger
      .createQueryBuilder(Profile, 'profile')
      .update()
      .set(updateDto)
      .where('profile.id = :id', { id: profileId })
      .execute();
  }

  async getOneById(profileId: number): Promise<Profile> {
    return await this.findOne(profileId);
  }
}
