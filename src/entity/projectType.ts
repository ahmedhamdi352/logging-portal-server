import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

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
}
