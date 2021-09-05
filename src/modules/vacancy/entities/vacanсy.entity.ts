import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string

  @Column('text')
  text: string;

  @Column({ default: true })
  isPublish: boolean;
}