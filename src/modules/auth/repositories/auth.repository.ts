import { User } from '@core/database/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  /**
   * Renvoie un utilisateur si il existe
   *
   * @param email
   * @returns
   */
  async login(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.password'])
      .where('user.email = :email', { email })
      .getOne();
  }
}
