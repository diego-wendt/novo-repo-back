import { DataSource } from "typeorm";
import { UserDevicesDataEntity } from "./entity/userDevicesData.entity";

export const UserDevicesDataProviders = [
  {
    provide: "USER_DEVICES_DATA_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserDevicesDataEntity),
    inject: ["DATA_SOURCE"],
  },
];
