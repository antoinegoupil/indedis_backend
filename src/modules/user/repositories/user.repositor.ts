import { User } from '@core/database/entities/user.entity';
import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Ajoute un utilisateur
   *
   * @param entity
   * @returns
   */
  override async insert(entity: QueryDeepPartialEntity<User> | QueryDeepPartialEntity<User>[]): Promise<InsertResult> {
    return await this.createQueryBuilder().insert().into(User).values(entity).execute();
  }
}
