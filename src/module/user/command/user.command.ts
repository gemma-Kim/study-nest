export class UserCreateCommand {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly nickname: string,
  ) {}
}

export class UserUpadateCommand {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly password: string,
    readonly nickname: string,
  ) {}
}
