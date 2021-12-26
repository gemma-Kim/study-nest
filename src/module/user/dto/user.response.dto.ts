export class JoinResponseDto {
  id: number;
  email: string;
  nickname: string;
  createAt: string;
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.nickname = data.nickname;
    this.createAt = data.createAt;
  }
}
