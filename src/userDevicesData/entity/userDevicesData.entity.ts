import { DevicesEntity } from 'src/devices/entity/devices.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_devices_data' })
export class UserDevicesDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DevicesEntity, (devices) => devices.id)
  @JoinColumn({ name: 'devices_id' })
  devices_id: DevicesEntity;

  @Column()
  value: number;

  @CreateDateColumn({ name: 'create_date' })
  createdAt: Date;
}
