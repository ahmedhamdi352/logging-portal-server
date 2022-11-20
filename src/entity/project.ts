import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProjectType } from './projectType';
import { Allocation } from './allocation';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  internalId: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => ProjectType)
  @JoinColumn()
  type: ProjectType;

  @OneToMany(() => Allocation, (role) => role.project)
  allocation: Allocation;
}
