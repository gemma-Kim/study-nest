import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../../user/application/user.service';
import { AuthPayload } from '../dto/auth.payload.dto';
import { Email, Password } from 'src/module/user/domain/user.domain';
import { AccessToken } from '../domain/auth.domain';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(payloadData: AuthPayload) {
    const payload = {
      userId: payloadData.id,
      email: payloadData.email,
    };

    return new AccessToken(this.jwtService.sign(payload));
  }

  async validate(accessToken: AccessToken) {
    await this.jwtService.verify(accessToken.value);
  }

  async validatePassword(notSurePassword: Password, validPassword: Password) {
    return compare(notSurePassword.value, validPassword.value);
  }
}
