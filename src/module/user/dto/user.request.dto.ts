import { IsString } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly nickname: string;
}

export class LogInRequestDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
