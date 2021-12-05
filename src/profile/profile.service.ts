import { Injectable } from '@nestjs/common';
import { NewProfileRequestDto } from './dto/newProfile.request.dto';

@Injectable()
export class ProfileService {
  constructor() {}
  async addNewProfile(userId: number, profileData: NewProfileRequestDto) {}
}
