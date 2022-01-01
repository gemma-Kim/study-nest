import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './application/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.reposiory';
import { ProfileRepository } from '../profile/repository/profile.repository';
import { AuthService } from '../auth/application/auth.service';

@Module({
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
