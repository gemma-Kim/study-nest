import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/application/user.service';
import { AuthPayload } from '../dto/auth.payload.dto';
import { Email, Password } from 'src/module/user/domain/user.domain';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccessToken(payloadData: AuthPayload) {
    const payload = {
      userId: payloadData.id,
      email: payloadData.email,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validate(token: string) {
    await this.jwtService.verify(token);
  }

  async validateUser(email: Email, password: Password) {
    const user = await this.userService.findOne(email.value);

    if (user && compare(password.value, user.password)) {
      return await this.createAccessToken({ id: user.id, email: user.email });
    }
    return null;
  }
}
