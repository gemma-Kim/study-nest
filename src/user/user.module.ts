import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.reposiory';
import { ProfileRepository } from '../profile/repository/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
