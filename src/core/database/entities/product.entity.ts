import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommandProduct } from './command-product.entity';
import { Mark } from './mark.entity';
import { Taste } from './taste.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ManyToOne(() => Mark, (mark) => mark.products)
  mark: Mark;

  @ManyToMany(() => Taste, (taste) => taste.products)
  tastes: Taste[];

  @OneToMany(() => CommandProduct, (commandProduct) => commandProduct.product)
  commandsProduct: CommandProduct[];

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
