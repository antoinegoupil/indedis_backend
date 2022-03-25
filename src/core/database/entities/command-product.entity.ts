import { Column, Entity, ManyToOne } from 'typeorm';
import { Command } from './command.entity';
import { Product } from './product.entity';

@Entity()
export class CommandProduct {
  @ManyToOne(() => Product, (product) => product.commandsProduct, { primary: true })
  product: Product;

  @ManyToOne(() => Command, (command) => command.commandProducts, { primary: true })
  command: Command;

  @Column({ type: 'int', nullable: false })
  amount: number;

  constructor(partial: Partial<CommandProduct>) {
    Object.assign(this, partial);
  }
}
