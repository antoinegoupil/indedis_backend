import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Command } from './command.entity';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 5 })
  postalCode: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  city: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  address: string;

  @Column({ type: 'varchar', nullable: true, length: 150 })
  complement: string;

  @ManyToOne(() => User, (user) => user.addresses, { nullable: true })
  user: User;

  @OneToMany(() => Command, (command) => command.address)
  commands: Command[];

  constructor(partial: Partial<Address>) {
    Object.assign(this, partial);
  }
}
