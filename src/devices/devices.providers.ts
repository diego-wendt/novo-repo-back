import { DataSource } from "typeorm";
import { DevicesEntity } from "./entity/devices.entity";

export const DeviceProviders = [
  {
    provide: "DEVICE_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DevicesEntity),
    inject: ["DATA_SOURCE"],
  },
];
