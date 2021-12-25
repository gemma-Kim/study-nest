import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/entity/user.reposiory';
import { EntityManager, getConnection } from 'typeorm';
import { NewProfileResponseDto } from './dto/getProfile.response.dto';
import { NewProfileRequestDto } from './dto/newProfile.request.dto';
import {
  addNewProfileDto,
  UpdateUserProfileDto,
} from './dto/updateUserProfile.dto';
import { Profile, UserProfile } from './domain/profile.domain';
import { ProfileRepository } from './repository/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async exists(profieId: number) {
    const profile = await this.profileRepository.getOneById(profieId);
    if (!profile) {
      throw new NotFoundException('PROFILE_DOEST_NOT_EXIST');
    }
  }

  async getProfile(userId: number) {
    //: Promise<NewProfileResponseDto> {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new NotFoundException();
    }
    //const profile =  getUserProfile(userId);

    // const userProfile: NewProfileResponseDto = {
    //   id: profile.id,
    //   userId: profile.userId,
    //   photo: profile.photo,
    //   gender: profile.gender,
    // };

    // return userProfile;
  }

  async updateProfile(profileId: number, data: UpdateUserProfileDto) {
    try {
      if (!profileId) {
        throw new BadRequestException();
      }

      const result = await getConnection()
        .transaction(async (entityManager: EntityManager) => {
          let newUserData;
          let addedProfileData;

          if (data.email) {
            const email = data.email;
            newUserData = await this.userRepository.saveUser(
              { email, id: 1 },
              entityManager,
            );
          }

          if (data.photo || data.gender) {
            const newProfile: addNewProfileDto = {};
            if (data.photo) newProfile.photo = data.photo;
            if (data.gender) newProfile.gender = data.gender;
            addedProfileData = await this.profileRepository.updateProfile(
              entityManager,
              profileId,
              newProfile,
            );
          }
          console.log('addedProfileData', addedProfileData);
          return { ...newUserData, ...addedProfileData };
        })
        .then((trxResult) => {
          return trxResult;
        })
        .catch((err) => {
          throw err;
        });

      console.log('후', result);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
