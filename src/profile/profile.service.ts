import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewProfileResponseDto } from './dto/getProfile.response.dto';
import { NewProfileRequestDto } from './dto/newProfile.request.dto';
import { Profile } from './entity/profile.entity';
import { ProfileRepository } from './repository/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getUserProfile(userId: number): Promise<NewProfileResponseDto> {
    const profile = await this.profileRepository.getUserProfile(userId);

    const userProfile: NewProfileResponseDto = {
      id: profile.id,
      userId: profile.userId,
      photo: profile.photo,
      gender: profile.gender,
    };

    return userProfile;
  }

  async addNewProfile(userId: number, profileData) {
    // console.log(userId, profileData);
    // console.log({
    //   userId,
    //   ...profileData,
    // });
    // const profile = new Profile();
    // profile.gender = profileData.gender;
    // profile.photo = profileData.photo;
    // profile.user = userId;
    // console.log('profile', profile);
    // const newProfile = await this.profileRepository.save(profile);
    // console.log('newProfile', newProfile);
    // return newProfile;
  }
}
