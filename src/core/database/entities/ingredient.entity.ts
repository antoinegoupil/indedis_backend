import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  name: string;

  @ManyToMany(() => Product, (product) => product.ingredients)
  products: Product[];

  constructor(partial: Partial<Ingredient>) {
    Object.assign(this, partial);
  }
}
