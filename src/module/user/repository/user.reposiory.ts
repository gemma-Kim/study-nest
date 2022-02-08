import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { UserCreateCommand, UserUpadateCommand } from '../command/user.command';
import { UserOrmEntity } from './user.orm.entity';
import { User } from '../domain/entity/user.entity';
import { FindUserDto } from '../dto/user.dto';

export interface IUserRepository {
  FindOne: (data: FindUserDto) => Promise<User>;
  Create: (
    saveData: UserCreateCommand,
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
    saveData: UserCreateCommand,
    @TransactionManager() entityManager?: EntityManager,
  ): Promise<UserOrmEntity> {
    if (entityManager) {
      return await entityManager.save(UserOrmEntity, saveData);
    } else {
      return await this.save(saveData);
    }
  }

  async FindOne(data: FindUserDto): Promise<User> {
    const userData: UserOrmEntity = await this.createQueryBuilder()
      .where(data)
      .getOne();

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
