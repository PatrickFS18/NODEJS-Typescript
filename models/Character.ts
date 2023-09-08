// src/models/Character.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Location } from './Location';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  species: string;

  @Column()
  type: string;

  @Column()
  gender: string;

  @Column()
  origin: Location;

  @Column()
  location: Location;

  @Column()
  image: string;

  @Column('datetime')
  created: Date;

  @Column()
  url: string;
}
