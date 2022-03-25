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

  async insertWithTypeAndStatus(entity: QueryDeepPartialEntity<User>, typeCode: string, statusCode: string) {
    return await this.createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email: entity.email,
        password: entity.password,
        name: entity.name,
        firstname: entity.firstname,
        userType: () => `(SELECT tu.id from user_type tu WHERE tu.code = '${typeCode}')`,
        userStatus: () => `(SELECT su.id FROM user_status su WHERE su.code = '${statusCode}')`,
      })
      .execute();
  }
}
