import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './application/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.reposiory';
import { ProfileRepository } from '../profile/repository/profile.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  exports: [],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserRepository, ProfileRepository]),
  ],
  providers: [UserService, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
