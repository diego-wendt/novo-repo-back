import { Module } from "@nestjs/common";
import { ModelDevicesService } from "./service/modelDevices.service";
import { ModelDevicesController } from "./controller/modelDevices.controller";
import { ModelDevicesProviders } from "./modelDevices.providers";
import { DatabaseProviders } from "src/core/database/database.providers";

@Module({
  controllers: [ModelDevicesController],
  providers: [
    ModelDevicesService,
    ...DatabaseProviders,
    ...ModelDevicesProviders,
  ],
  exports: [ModelDevicesService],
})
export class ModelDevicesModule {}
