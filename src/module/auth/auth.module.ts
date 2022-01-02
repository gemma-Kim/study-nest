import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/application/user.service';
import { UserRepository } from '../user/entity/user.reposiory';
import { AuthService } from './application/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '2 days',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtModule],
  exports: [AuthService],
})
export class AuthModule {}
