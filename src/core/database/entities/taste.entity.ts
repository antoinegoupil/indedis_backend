import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Taste {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  name: string;

  @ManyToMany(() => Product, (product) => product.tastes)
  products: Product[];

  constructor(partial: Partial<Taste>) {
    Object.assign(this, partial);
  }
}
