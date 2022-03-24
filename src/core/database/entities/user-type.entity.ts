import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ nullable: false })
  lib: string;

  // Jointure User[]

  @OneToMany(() => User, (user) => user.userType)
  users: User[];

  constructor(partial: Partial<UserType>) {
    Object.assign(this, partial);
  }
}
