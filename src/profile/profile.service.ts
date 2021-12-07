import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/entity/user.reposiory';
import { NewProfileResponseDto } from './dto/getProfile.response.dto';
import { NewProfileRequestDto } from './dto/newProfile.request.dto';
import { Profile } from './entity/profile.entity';
import { ProfileRepository } from './repository/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getProfile(userId: number): Promise<NewProfileResponseDto> {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new NotFoundException();
    }
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
    const profile = new Profile();
    profile.gender = profileData.gender;
    profile.photo = profileData.photo;
    profile.userId = userId;

    const newProfile = await this.profileRepository.addNewProfile(profile);

    return newProfile;
  }

  async save(profile) {}
}
