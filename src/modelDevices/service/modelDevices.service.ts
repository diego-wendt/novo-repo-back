import { Inject } from "@nestjs/common/decorators";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ModelDevicesEntity } from "../entity/modelDevices.entity";
import { modelDevices } from "../mock/modelDevices.mock";

@Injectable()
export class ModelDevicesService {
  constructor(
    @Inject("MODEL_DEVICES_REPOSITORY")
    private modelDeviceRepository: Repository<ModelDevicesEntity>,
  ) { }

  async findModelsRepository() {
    return await this.modelDeviceRepository.find();
  }

  async createModels() {
    return new Promise(async (resolve, reject) => {
      try {
        const promises = modelDevices.map(async (device) => {
          const newModel = this.modelDeviceRepository.create();
          const { barcode, batch, max_range, min_range, name, type } = device;
          newModel.barcode = barcode;
          newModel.batch = batch;
          newModel.max_range = max_range;
          newModel.min_range = min_range;
          newModel.name = name;
          newModel.type = type;
          await this.modelDeviceRepository.save(newModel);
        });
        await Promise.all(promises);
        resolve({ message: "Models has been registered." });
      } catch (error) {
        reject(error)
      }
    });
  }

  async findAllModels(): Promise<ModelDevicesEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let models = await this.findModelsRepository();
        if (models.length < 1) {
          await this.createModels();
          models = await this.findModelsRepository();
        }
        resolve(models);
      } catch (error) {
        reject(error)
      }
    });
  }

  async findModelDevice(type_id): Promise<ModelDevicesEntity> {
    return await new Promise(async (resolve, reject) => {
      try {
        const modelDevice = await this.modelDeviceRepository.findOne({
          where: {
            id: type_id,
          },
        });
        if (!modelDevice) {
          throw new NotFoundException("Model device not found.");
        }
        resolve(modelDevice);
      } catch (error) {
        reject(error);
      }
    });
  }
}
