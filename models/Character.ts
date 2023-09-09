import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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

  // Colunas para informações de origem
  @Column()
  originName: string;   // Nome da origem

  @Column()
  originLink: string;   // Link para a origem

  // Colunas para informações de localização
  @Column()
  locationName: string;   // Nome da localização

  @Column()
  locationLink: string;   // Link para a localização

  @Column()
  image: string;

  @Column('datetime')
  created: Date;

  @Column()
  url: string;
}
