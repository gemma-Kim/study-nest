import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { User } from '../entity/user.entity';

export interface IUserRepository {
  Find: (userId: number) => Promise<User>;
  Save: (saveData, entityManager?: EntityManager) => Promise<User>;
}

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async Find(userId: number) {
    return await this.findOne(userId);
  }
  async Save(saveData, @TransactionManager() entityManager?: EntityManager) {
    if (entityManager) {
      return await entityManager.save(User, saveData);
    } else {
      return await this.save(saveData);
    }
  }
}
