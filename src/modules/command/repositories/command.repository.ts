import { CommandProduct } from '@core/database/entities/command-product.entity';
import { Command } from '@core/database/entities/command.entity';
import { Product } from '@core/database/entities/product.entity';
import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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

  /**
   * Ajoute une commande
   *
   * @param entity
   * @returns
   */
  override async insert(
    entity: QueryDeepPartialEntity<Command> | QueryDeepPartialEntity<Command>[],
  ): Promise<InsertResult> {
    return await this.createQueryBuilder().insert().into(Command).values(entity).execute();
  }

  async insertCommandProduct(amount: number, idProduct: number, idCommand: number) {
    await this.createQueryBuilder()
      .insert()
      .into(CommandProduct)
      .values({ amount, product: new Product({ id: idProduct }), command: new Command({ id: idCommand }) })
      .execute();
  }
}
