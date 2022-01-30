import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfileResponseDto } from '../dto/profile.response.dto';
import { ProfileService } from './profile.service';
import { ProfileRepository } from '../repository/profile.repository';
import {
  CreateProfileRequestDto,
  RequestUpdateProfileDto,
  SearchProfileRequestDto,
} from '../dto/profile.request.dto';
import { UserService } from 'src/module/user/domain/user.service';
import { UpdateProfileCommand } from '../domain/command/updateProfile.command';
import { Profile } from '../domain/entity/profile.entity';
import { Gender, Photo } from '../domain/value-object/profile.value-object';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
  ) {}

  @Post(':userId')
  async createProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() profileData: CreateProfileRequestDto,
  ) {
    const user = await this.userService.exists({ id: userId });
    if (!user) {
      throw new NotFoundException('DOES_NOT_EXIST_USER');
    }

    const profile = new Profile();
    profile.setNewProfile(userId, profileData.photo, profileData.gender);
    const savedProfile = await this.profileRepository.Create(profile);

    return new ProfileResponseDto(savedProfile);
  }

  @Get(':profileId')
  async getProfile(@Param('profileId', ParseIntPipe) profileId: number) {
    const profile = await this.profileService.exists(profileId);
    if (!profile) {
      throw new NotFoundException('PROFILE_DOEST_NOT_EXIST');
    }
    return new ProfileResponseDto(profile);
  }

  @Get()
  async searchProfiles(@Param() searchParamData: SearchProfileRequestDto) {
    await this.profileService.findProfiles(searchParamData);
  }

  @Patch(':profileId')
  async updateProfile(
    @Param('profileId') profileId: number,
    @Body() updateData: RequestUpdateProfileDto,
  ) {
    const profile = await this.profileService.exists(profileId);
    if (!profile) {
      throw new BadRequestException('DOES_NOT_EXIST_PROFILE');
    }
    const updateCommand = new UpdateProfileCommand(
      profileId,
      updateData.photo,
      updateData.gender,
    );
    await this.profileRepository.Update(updateCommand);
    return { result: 'SUCCESS' };
  }
}
