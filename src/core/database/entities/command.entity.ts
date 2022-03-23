import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { CommandProduct } from './command-product.entity';
import { User } from './user.entity';

@Entity()
export class Command {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'time', nullable: false })
  time: string;

  @OneToMany(() => CommandProduct, (commandProduct) => commandProduct.command)
  commandProducts: CommandProduct[];

  @ManyToOne(() => User, (user) => user.commands, { nullable: true })
  user: User;

  @ManyToOne(() => Address, (address) => address.commands, { nullable: true })
  address: Address;

  constructor(partial: Partial<Command>) {
    Object.assign(this, partial);
  }
}
