import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './repository/profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/entity/user.reposiory';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
