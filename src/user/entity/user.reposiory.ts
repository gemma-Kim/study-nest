import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUser(userId: number) {
    return await this.findOne(userId);
  }
  async saveUser(saveDate) {
    return await this.save(saveDate);
  }
}
