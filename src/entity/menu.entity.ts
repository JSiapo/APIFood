import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Food } from './food.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: string;

  @ManyToOne(
    type => Food,
    food => food.menus
  )
  food: Food;

  @Column({ default: true })
  state: boolean;
}
