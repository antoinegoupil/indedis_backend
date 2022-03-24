import { User } from '@core/database/entities/user.entity';
import { STATUS_UTILISATEUR } from '@shared/constants/database.constant';
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
      .innerJoin('user.userType', 'userType')
      .addSelect(['userType.code'])

      .innerJoin('user.userStatus', 'userStatus')

      .where('user.email = :email', { email })
      .andWhere('userStatus.code = :status', { status: STATUS_UTILISATEUR.ACTIF })
      .getOne();
  }
}
