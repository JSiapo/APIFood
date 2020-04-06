import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
const bcrypt = require('bcrypt');
import { SALT } from '../config';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  username: string;

  @Index({ unique: true })
  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'guest' })
  role: string;

  @Column({ default: true })
  state: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashpassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, SALT);
    }
  }
}
