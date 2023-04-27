import { Module } from "@nestjs/common";
import { DevicesService } from "./service/devices.service";
import { DevicesController } from "./controller/devices.controller";
import { DatabaseProviders } from "src/core/database/database.providers";
import { DeviceProviders } from "./devices.providers";
import { PlacesModule } from "src/places/places.module";
import { ModelDevicesModule } from "src/modelDevices/modelDevices.module";

@Module({
  imports: [PlacesModule, ModelDevicesModule],
  controllers: [DevicesController],
  providers: [DevicesService, ...DatabaseProviders, ...DeviceProviders],
  exports: [DevicesService],
})
export class DevicesModule {}
