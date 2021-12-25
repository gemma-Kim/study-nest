import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUser(userId: number) {
    return await this.findOne(userId);
  }
  async saveUser(
    saveData,
    @TransactionManager() entityManager?: EntityManager,
  ) {
    if (entityManager) {
      return await entityManager.save(User, saveData);
    } else {
      return await this.save(saveData);
    }
  }
}
