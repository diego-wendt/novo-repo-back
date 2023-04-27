import { DataSource } from "typeorm";
import { ModelDevicesEntity } from "./entity/modelDevices.entity";

export const ModelDevicesProviders = [
  {
    provide: "MODEL_DEVICES_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ModelDevicesEntity),
    inject: ["DATA_SOURCE"],
  },
];
