export class AuthPayload {
  id: number;
  email: string;
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
  }
}
