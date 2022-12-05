import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProjectType } from './projectType';
import { Allocation } from './allocation';
import { Logs } from './logs';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  internalId: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  customer: string;

  @Column()
  country: string;

  @Column()
  trxNumber: number;

  @Column()
  logTypes: string;

  @ManyToOne(() => ProjectType, (u) => u.project)
  type: ProjectType;

  @OneToMany(() => Allocation, (role) => role.project)
  allocation: Allocation;

  @OneToMany(() => Logs, (u) => u.project)
  logs: Logs[];
}
