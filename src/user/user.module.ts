import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.reposiory';
import { ProfileRepository } from './entity/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
