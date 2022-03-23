import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  name: string;

  @OneToMany(() => Product, (product) => product.mark)
  products: Product[];

  constructor(partial: Partial<Mark>) {
    Object.assign(this, partial);
  }
}
