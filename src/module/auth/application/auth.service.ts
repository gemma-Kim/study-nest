import { genSalt, hash, compare } from 'bcrypt';
import { AuthPayload } from '../dto/auth.payload.dto';
import { Password } from 'src/module/user/domain/user.domain';
import { AccessToken } from '../domain/auth.domain';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(payloadData: AuthPayload) {
    const payload = {
      userId: payloadData.id,
      email: payloadData.email,
    };

    return new AccessToken(this.jwtService.sign(payload));
  }

  async hashPassword(password: Password) {
    const saltRounds: number = Number(process.env.SALT_ROUNDS);
    const salt = await genSalt(saltRounds);
    return hash(password.value, salt);
  }

  async validate(tokenData: AccessToken) {
    await this.jwtService.verify(tokenData.accessToken);
  }

  async validatePassword(notSurePassword: Password, validPassword: Password) {
    return compare(notSurePassword.value, validPassword.value);
  }
}
