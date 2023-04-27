import { ModelDevicesEntity } from "src/modelDevices/entity/modelDevices.entity";
import { PlacesEntity } from "src/places/entity/places.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "devices" })
export class DevicesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @Column()
  mac_address: string;

  @ManyToOne(() => ModelDevicesEntity, (type) => type.id)
  @JoinColumn({ name: "type_id" })
  type_id: ModelDevicesEntity;

  @ManyToOne(() => PlacesEntity, (place) => place.id)
  @JoinColumn({ name: "place_id" })
  place_id: PlacesEntity;

  @CreateDateColumn({ name: "create_date" })
  created_at: Date;

  @UpdateDateColumn({ name: "update_date" })
  updated_at: Date;

  @DeleteDateColumn({ name: "delete_date" })
  deleted_at: Date;
}
