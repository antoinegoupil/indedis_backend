import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { Command } from './command.entity';
import { UserStatus } from './user-status.entity';
import { UserType } from './user-type.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  firstname: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  password: string;

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.users)
  userStatus: UserStatus;

  @ManyToOne(() => UserType, (userType) => userType.users)
  userType: UserType;

  @OneToMany(() => Command, (command) => command.user)
  commands: Command[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
