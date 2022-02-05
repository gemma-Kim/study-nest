import { Module } from '@nestjs/common';
import { ProfileService } from './application/profile.service';
import { ProfileController } from './application/profile.controller';
import { ProfileRepository } from './repository/profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/module/user/repository/user.reposiory';
import { UserService } from '../user/domain/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
  providers: [ProfileService, UserService],
  controllers: [ProfileController],
})
export class ProfileModule {}
