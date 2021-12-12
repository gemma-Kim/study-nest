import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NewProfileResponseDto } from './dto/getProfile.response.dto';
import { NewProfileRequestDto } from './dto/newProfile.request.dto';
import { RequestUpdateProfileDto } from './dto/updateUserProfile.dto';
import { Profile } from './entity/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':userId/profile')
  async addProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() profileData: NewProfileRequestDto,
  ) {
    return await this.profileService.addNewProfile(userId, profileData);
  }

  async getProfile(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<NewProfileResponseDto> {
    return await this.profileService.getProfile(userId);
  }

  @Patch(':profileId')
  async updateProfile(
    @Body() data: RequestUpdateProfileDto,
    @Param('profileId', ParseIntPipe) profileId: number,
  ) {
    return await this.profileService.updateUserProfile(profileId, data);
  }
}
