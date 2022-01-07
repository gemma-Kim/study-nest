import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { UserUpadateCommand } from '../command/user.command';
import { User } from '../entity/user.entity';

export interface IUserRepository {
  Find: (obj) => Promise<User>;
  Create: (saveData, entityManager?: EntityManager) => Promise<User>;
  Update: (
    updateData: UserUpadateCommand,
    entityManager?: EntityManager,
  ) => Promise<User>;
}

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async Create(saveData, @TransactionManager() entityManager?: EntityManager) {
    if (entityManager) {
      return await entityManager.save(User, saveData);
    } else {
      return await this.save(saveData);
    }
  }

  async Find(data) {
    return await this.findOne(data);
  }

  async Update(
    updateData: UserUpadateCommand,
    @TransactionManager() entityManager?: EntityManager,
  ) {
    if (entityManager) {
      return await entityManager.save(User, updateData);
    } else {
      return await this.save(updateData);
    }
  }
}
