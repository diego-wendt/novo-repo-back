import { Module } from "@nestjs/common";
import { UserDevicesDataService } from "./service/userDevicesData.service";
import { UserDevicesDataController } from "./controller/userDevicesData.controller";
import { DatabaseProviders } from "src/core/database/database.providers";
import { UserDevicesDataProviders } from "./userDevicesData.providers";
import { DevicesModule } from "src/devices/devices.module";
import { DeviceProviders } from "src/devices/devices.providers";

@Module({
  imports: [DevicesModule],
  controllers: [UserDevicesDataController],
  providers: [
    UserDevicesDataService,
    ...UserDevicesDataProviders,
    ...DeviceProviders,
    ...DatabaseProviders,
  ],
})
export class UserDevicesDataModule {}
