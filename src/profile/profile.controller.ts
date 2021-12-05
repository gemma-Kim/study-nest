import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NewProfileRequestDto } from './dto/newProfile.request.dto';
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

  async getProfile() {}
}
