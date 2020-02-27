import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  options: string;

  @Column()
  state: boolean;

  @OneToMany(
    type => Menu,
    menu => menu.food
  )
  menus: Menu[];
}
