import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ManagerRole } from '@domain/manager/manager.role';
import { ManagerStatus } from '@domain/manager/manager.status';

@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ManagerRole,
  })
  role: ManagerRole;

  @Column({
    type: 'enum',
    enum: ManagerStatus,
  })
  status: ManagerStatus;

  @CreateDateColumn({ name: 'create_date_time' })
  createDateTime: Date;

  @UpdateDateColumn({ name: 'update_date_time' })
  updateDateTime: Date;
}
