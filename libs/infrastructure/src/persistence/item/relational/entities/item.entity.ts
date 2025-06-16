import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vendor } from '@domain/item/vendor';

@Entity('item')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: Vendor,
  })
  vendor: Vendor;

  @Column()
  link: string;

  @CreateDateColumn({ name: 'create_date_time' })
  createDateTime: Date;

  @UpdateDateColumn({ name: 'update_date_time' })
  updateDateTime: Date;
}
