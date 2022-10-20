import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
@Entity()
export class Logs extends BaseEntity {
  @PrimaryGeneratedColumn()
  internalId: number;

  @Column()
  day: string;

  @Column()
  date: string;

  @Column()
  knowledgeSharing: number;

  @Column()
  teamMeetings: number;

  @Column()
  dailyStandup: number;

  @Column()
  collaboration: number;

  @Column()
  learning: number;

  @Column()
  planned: number;

  @Column()
  externalSupport: number;

  @Column()
  internalSupport: number;

  @Column()
  support: number;

  @Column('decimal', { precision: 5, scale: 2 })
  manHour: number;

  @Column({ default: false })
  vacation: boolean;

  @ManyToOne(() => User, (user) => user.logs)
  user: User;
}
