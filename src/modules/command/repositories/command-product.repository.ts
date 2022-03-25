import { CommandProduct } from '@core/database/entities/command-product.entity';
import { Command } from '@core/database/entities/command.entity';
import { Product } from '@core/database/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommandProduct)
export class CommandProductRepository extends Repository<CommandProduct> {
  async insertByIds(amount: number, idProduct: number, idCommand: number) {
    await this.createQueryBuilder()
      .insert()
      .into(CommandProduct)
      .values({ amount, product: new Product({ id: idProduct }), command: new Command({ id: idCommand }) })
      .execute();
  }
}
