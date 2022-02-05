import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { UpdateProfileCommand } from '../domain/command/updateProfile.command';
import { Profile } from '../domain/entity/profile.entity';
import { genderType } from '../type/profile.type';
import { ProfileOrmEntity } from './profile.orm.entity';

interface IProfileRepository {
  Create: (
    newProfile: Profile,
    entityManger?: EntityManager,
  ) => Promise<ProfileOrmEntity>;

  FindOne: (profileId: number) => Promise<Profile>;
  Update: (
    updateDto: UpdateProfileCommand,
    entityManger?: EntityManager,
  ) => Promise<ProfileOrmEntity>;
}

@EntityRepository(ProfileOrmEntity)
//implements IProfileRepository
export class ProfileRepository extends Repository<ProfileOrmEntity> {
  async getProfile(profileData): Promise<ProfileOrmEntity[]> {
    return await this.find({ where: profileData });
  }

  async getUserProfile(userId: number): Promise<ProfileOrmEntity> {
    return await this.findOne({ where: { userId } });
  }

  async Create(
    newProfile: { userId: number; gender: genderType; photo: string },
    entityManger?: EntityManager,
  ): Promise<ProfileOrmEntity> {
    if (entityManger instanceof EntityManager) {
      return await entityManger.save(ProfileOrmEntity, newProfile);
    }
    return await this.save(newProfile);
  }

  async FindOne(profileId: number): Promise<ProfileOrmEntity> {
    return await this.findOne(profileId);
  }

  async Update(
    updateDto: UpdateProfileCommand,
    entityManger?: EntityManager,
  ): Promise<ProfileOrmEntity> {
    return await this.save(updateDto);
  }
}
