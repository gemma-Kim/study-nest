import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { UserUpadateCommand } from '../command/user.command';
import { UserOrmEntity } from './user.orm.entity';
import { User } from '../domain/entity/user.entity';

export interface IUserRepository {
  Find: (data) => Promise<User>;
  Create: (
    saveData: { email: string; nickname: string; password: string },
    entityManager?: EntityManager,
  ) => Promise<UserOrmEntity>;
  Update: (
    updateData: UserUpadateCommand,
    entityManager?: EntityManager,
  ) => Promise<UserOrmEntity>;
}

@EntityRepository(UserOrmEntity)
export class UserRepository
  extends Repository<UserOrmEntity>
  implements IUserRepository
{
  async Create(
    saveData: { email: string; nickname: string; password: string },
    @TransactionManager() entityManager?: EntityManager,
  ): Promise<UserOrmEntity> {
    if (entityManager) {
      return await entityManager.save(UserOrmEntity, saveData);
    } else {
      return await this.save(saveData);
    }
  }

  async Find(data): Promise<User> {
    const userData = await this.findOne(data);

    if (userData) {
      const user = new User(
        userData.id,
        userData.email,
        userData.nickname,
        userData.password,
      );
      return user;
    }
  }

  async Update(
    updateData: UserUpadateCommand,
    @TransactionManager() entityManager?: EntityManager,
  ) {
    if (entityManager) {
      return await entityManager.save(UserOrmEntity, updateData);
    } else {
      return await this.save(updateData);
    }
  }
}
