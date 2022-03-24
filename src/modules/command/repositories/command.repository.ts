import { Command } from '@core/database/entities/command.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Command)
export class CommandRepository extends Repository<Command> {
  /**
   * Liste des commandes d'un utilisateur
   *
   * @param idUser
   * @returns
   */
  async finByUser(idUser: number): Promise<Command[]> {
    return await this.createQueryBuilder('command')
      .select(['command.id', 'command.date', 'command.time', 'command.price'])
      .where('command.user = :user', { user: idUser })
      .getMany();
  }

  async findById(id: number) {
    return await this.createQueryBuilder('command')
      .select(['command.id', 'command.date', 'command.time', 'command.price'])

      // Address
      .innerJoin('command.address', 'address')
      .addSelect(['address.id', 'address.postalCode', 'address.city', 'address.address', 'address.complement'])

      // Product
      .innerJoinAndSelect('command.commandProducts', 'commandProducts')
      .innerJoin('commandProducts.product', 'product')
      .addSelect(['product.id', 'product.name'])

      .where('command.id = :id', { id })
      .getOne();
  }
}
