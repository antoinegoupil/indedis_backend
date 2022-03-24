import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ nullable: false })
  lib: string;

  // Jointure User[]

  @OneToMany(() => User, (user) => user.userStatus)
  users: User[];

  constructor(partial: Partial<UserStatus>) {
    Object.assign(this, partial);
  }
}
