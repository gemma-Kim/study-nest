export class JoinResponseDto {
  userId: number;
  email: string;
  nickname: string;
  createAt: string;
  constructor(data) {
    this.userId = data.id;
    this.email = data.email;
    this.nickname = data.nickname;
    this.createAt = data.createAt;
  }
}

export class updateUserInfoResponseDto {
  userId: number;
  email: string;
  nickname: string;
  updateAt: string;
  constructor(data) {
    this.userId = data.id;
    this.email = data.email;
    this.nickname = data.nickname;
    this.updateAt = data.updateAt;
  }
}
