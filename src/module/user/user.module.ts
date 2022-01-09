import { Module } from '@nestjs/common';
import { UserController } from './application/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.reposiory';
import { ProfileRepository } from '../profile/repository/profile.repository';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './domain/user.service';

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
