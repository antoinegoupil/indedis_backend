import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Allergen } from './allergen.entity';
import { CommandProduct } from './command-product.entity';
import { Ingredient } from './ingredient.entity';
import { Mark } from './mark.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 150 })
  description: string;

  @Column({ type: 'real', nullable: false })
  price: number;

  @ManyToOne(() => Mark, (mark) => mark.products)
  mark: Mark;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.products)
  @JoinTable()
  ingredients: Ingredient[];

  @ManyToMany(() => Allergen, (allergen) => allergen.products)
  @JoinTable()
  allergens: Allergen[];

  @OneToMany(() => CommandProduct, (commandProduct) => commandProduct.product)
  commandsProduct: CommandProduct[];

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
