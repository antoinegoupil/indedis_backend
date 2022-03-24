import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Allergen {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  name: string;

  @ManyToMany(() => Product, (product) => product.allergens)
  products: Product[];

  constructor(partial: Partial<Allergen>) {
    Object.assign(this, partial);
  }
}
