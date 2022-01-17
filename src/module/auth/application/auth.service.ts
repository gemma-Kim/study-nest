import { AuthPayload } from '../dto/auth.payload.dto';
import { AccessToken } from '../domain/auth.domain';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(userId: number, email: string): AccessToken {
    const payload = new AuthPayload({
      userId,
      email,
    });
    return new AccessToken(this.jwtService.sign(payload));
  }

  async validate(tokenData: AccessToken) {
    await this.jwtService.verify(tokenData.accessToken);
  }
}
