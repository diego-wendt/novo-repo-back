import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common";

import { RemoveDeviceDto } from "../dto/removeDevice.dto";
import { createDeviceDto } from "../dto/createDevice.dto";
import { Repository } from "typeorm";
import { DevicesEntity } from "../entity/devices.entity";
import { FindPlaceDTO } from "src/places/dto/find-place.dto";
import { PlacesService } from "src/places/service/places.service";
import { ModelDevicesService } from "src/modelDevices/service/modelDevices.service";
import { IdDeviceDto } from "src/userDevicesData/dto/idDevice.dto";
import { PayloadDto } from "src/auth/dto/payload.dto";

@Injectable()
export class DevicesService {
  constructor(
    private modelDeviceService: ModelDevicesService,
    private placeService: PlacesService,
    @Inject("DEVICE_REPOSITORY")
    private deviceRepository: Repository<DevicesEntity>,
  ) {}

  async createDevice(
    createDevice: createDeviceDto,
    idPlace: FindPlaceDTO,
    user: PayloadDto,
  ) {
    return await new Promise(async (resolve, reject) => {
      try {
        const { mac_address, name, type_id } = createDevice;
        const place = await this.placeService.findPlace(idPlace, user);
        const type = await this.modelDeviceService.findModelDevice(type_id);
        await this.isAlreadyMacAddressExists(mac_address);

        const device = await this.deviceRepository.create();
        device.mac_address = mac_address;
        device.status = true;
        device.place_id = place;
        device.type_id = type;
        device.name = name;
        await this.deviceRepository.save(device);
        resolve({ message: "Device registered successfully" });
      } catch (error) {
        reject(error);
      }
    });
  }

  async isAlreadyMacAddressExists(macAddress) {
    return await new Promise(async (resolve, reject) => {
      try {
        const macAddressExists = await this.deviceRepository.findOne({
          where: {
            status: true,
            mac_address: macAddress,
          },
        });
        if (macAddressExists) {
          throw new ConflictException("MacAddress already registered.");
        }
        resolve(null);
      } catch (error) {
        reject(error);
      }
    });
  }

  async removeDevice(removeDevice: RemoveDeviceDto, user: PayloadDto) {
    return await new Promise(async (resolve, reject) => {
      try {
        const { id_device, id_place } = removeDevice;

        await Promise.all(
          await id_device.map(async (item) => {
            const device = await this.deviceRepository.findOne({
              where: {
                id: item,
                place_id: { id: id_place, company_id: { id: user.id } },
              },
            });
            if (!device) {
              throw new NotFoundException("Device not found");
            }
          }),
        );

        await this.deviceRepository.softDelete(id_device);

        resolve({ message: "Device removed successfully" });
      } catch (error) {
        reject(error);
      }
    });
  }

  async findDevice(
    idDevice: IdDeviceDto,
    user: PayloadDto,
  ): Promise<DevicesEntity> {
    return await new Promise(async (resolve, reject) => {
      try {
        const device = await this.deviceRepository.findOne({
          where: {
            id: idDevice.id_device,
            place_id: { company_id: { id: user.id } },
          },
          relations: { type_id: true },
        });

        if (!device) {
          throw new NotFoundException("Device not found");
        }
        resolve(device);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findDevicesFromPlace(
    idPlace: FindPlaceDTO,
    user: PayloadDto,
  ): Promise<DevicesEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const devices = await this.deviceRepository.find({
          select: {
            id: true,
            name: true,
            status: true,
            mac_address: true,
            created_at: true,
            type_id: { type: true },
          },
          where: {
            place_id: {
              id: idPlace.id_place,
              company_id: { id: user.id },
            },
          },
          relations: { type_id: true },
        });
        resolve(devices);
      } catch (error) {
        reject(error);
      }
    });
  }

  async allActiveDevices(): Promise<DevicesEntity[]> {
    const devices = await this.deviceRepository.find({
      select: {
        id: true,
      },
      where: {
        status: true,
      },
      relations: {
        type_id: true,
      },
    });
    return devices;
  }

  async changeStatusDevice(idDevice: IdDeviceDto, user: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        const device = await this.findDevice(idDevice, user);
        device.status = !device.status;
        const savedDevice = await this.deviceRepository.update(
          idDevice.id_device,
          device,
        );

        resolve({ message: "Changed successfully" });
      } catch (error) {
        reject(error);
      }
    });
  }
}
