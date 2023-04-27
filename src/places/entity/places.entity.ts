import { CompaniesEntity } from "src/companies/entity/company.entity";
import { DevicesEntity } from "src/devices/entity/devices.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "places" })
export class PlacesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "decimal", scale: 10 })
  latitude: number;

  @Column({ type: "decimal", scale: 10 })
  longitude: number;

  @ManyToOne(() => CompaniesEntity, (company) => company.id, {
    onDelete: "SET NULL",
    cascade: true,
  })
  @JoinColumn({ name: "company_id" })
  company_id: CompaniesEntity;

  @OneToMany(() => DevicesEntity, (device) => device.place_id)
  @JoinColumn({ name: "device_id" })
  devices: DevicesEntity[];

  @CreateDateColumn({ name: "create_date" })
  created_at: Date;

  @UpdateDateColumn({ name: "update_date" })
  updated_at: Date;

  @DeleteDateColumn({ name: "delete_date" })
  deleted_at: Date;
}
