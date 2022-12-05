import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Project } from './project';
import { string } from 'joi';

@Entity()
export class ProjectType extends BaseEntity {
  @PrimaryGeneratedColumn()
  internalId: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  color: string;

  @OneToMany(() => Project, (u) => u.type)
  project: Project;
}
