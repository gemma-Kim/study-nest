import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/module/user/repository/user.reposiory';
import { EntityManager, getConnection } from 'typeorm';
import { ProfileRepository } from '../repository/profile.repository';
import {
  RequestUpdateProfileDto,
  SearchProfileRequestDto,
} from '../dto/profile.request.dto';
import { ProfileOrmEntity } from '../repository/profile.orm.entity';
import { Profile } from '../domain/entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async exists(profileId: number): Promise<ProfileOrmEntity> | null {
    return await this.profileRepository.FindOne(profileId);
  }

  findProfiles() {}
}
