import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "model_devices" })
export class ModelDevicesEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  min_range: number;

  @Column()
  max_range: number;

  @Column()
  barcode: string;

  @Column()
  batch: string;
  
  @Column()
  unit: string;
}
