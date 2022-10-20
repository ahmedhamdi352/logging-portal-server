import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Role } from './Role';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import _ from 'lodash';
import config from '../config';
import { v4 as uuidv4 } from 'uuid';
import { Logs } from './logs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  internalId: number;

  @Column()
  firstName: string;

  @Column()
  id: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @OneToMany(() => Logs, (u) => u.user)
  logs: Logs[];

  @BeforeInsert()
  updatePasswordBeforeInsert() {
    this.password = this.hashPassword(this.password);
  }

  @BeforeInsert()
  updateidBeforeInsert() {
    this.id = uuidv4();
  }

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  // Functions
  public validatePassword = (password: string): boolean => {
    return compareSync(password, this.password);
  };

  public hashPassword = (pw: string): string => {
    const { saltRounds } = config;
    return hashSync(pw, genSaltSync(Number(saltRounds)));
  };
  public generateAuthToken = (): string => {
    const { jwt } = config;
    const role = this.role?.name || null;
    const rolePermissions = this.role?.permissions || [];
    const permissions = _.mapValues(
      _.keyBy(rolePermissions, 'name'),
      () => true
    );

    return jsonwebtoken.sign(
      {
        id: this.internalId,
        username: this.username,
        role,
        permissions,
        phone: this.phone,
      },
      jwt.secret,
      {
        expiresIn: jwt.expires,
      }
    );
  };
}
