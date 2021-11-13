import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInfo } from './dto/updateUserInfo.request.dto';
import { Profile } from './entity/profile.entity';
import { ProfileRepository } from './entity/profile.repository';
import { UserRepository } from './entity/user.reposiory';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async signIn(email: string, password: string) {
    const newUser = await this.userRepository.save({ email, password });
    console.log('newUser', newUser);
    return newUser;
  }

  async getUserInfo(id: number) {
    return await this.userRepository.findOne({ id });
  }

  async updateUserInfo(id: number, updateData: UpdateUserInfo) {
    const user = await this.userRepository.findOne({ id });
    console.log('user', user);

    if (user) {
      if (updateData.email) {
        user.email = updateData.email;
      }

      if (updateData.password) {
        user.password = updateData.password;
      }

      return await this.userRepository.save(user);
    }
  }

  async addNewProfile(userId: number, profileData) {
    console.log(userId, profileData);
    console.log({
      userId,
      ...profileData,
    });

    const profile = new Profile();
    profile.gender = profileData.gender;
    profile.photo = profileData.photo;
    profile.user = userId;
    console.log('profile', profile);
    const newProfile = await this.profileRepository.save(profile);
    console.log('newProfile', newProfile);
    return newProfile;
  }
}
