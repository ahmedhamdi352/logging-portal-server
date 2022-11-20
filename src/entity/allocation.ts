import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Project } from './project';
import { User } from './User';

@Entity()
export class Allocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  internalId: number;

  @Column({ unique: true })
  month: string;

  @ManyToOne(() => Project, (u) => u.allocation)
  project: Project[];

  @ManyToOne(() => User, (u) => u.allocation)
  user: User[];
}
