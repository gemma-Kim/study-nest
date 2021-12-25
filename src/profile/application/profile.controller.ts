import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { NewProfileResponseDto } from './dto/getProfile.response.dto';
import { NewProfileRequestDto } from './dto/newProfile.request.dto';
import { RequestUpdateProfileDto } from './dto/updateUserProfile.dto';
import { Gender, Photo, Profile, UserProfile } from './domain/profile.domain';
import { ProfileService } from './profile.service';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ProfileRepository } from './repository/profile.repository';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly profileRepository: ProfileRepository,
  ) {}

  @Post(':userId')
  async addProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() profileData: NewProfileRequestDto,
  ) {
    const profile = new Profile(
      new Gender(profileData.gender),
      new Photo(profileData.photo),
    );

    const userProfile = new UserProfile(userId, profile);

    return await this.profileRepository.createNewProfile(userProfile);
  }

  @Get(':profileId')
  async getProfile(@Param('profileId', ParseIntPipe) profileId: number) {
    const profile = await this.profileRepository.getOneById(profileId);
    if (!profile) {
      throw new NotFoundException('PROFILE_DOEST_NOT_EXIST');
    }

    return new NewProfileResponseDto(profile);
  }

  @Patch(':profileId')
  async updateProfile(
    @Param('profileId') profileId: number,
    @Body() updateData: RequestUpdateProfileDto,
  ) {
    await this.profileService.exists(profileId);
    await this.profileService.updateProfile(profileId, updateData);
    return { result: 'SUCCESS' };
  }
}
