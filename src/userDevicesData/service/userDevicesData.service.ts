import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { UserDevicesDataEntity } from "../entity/userDevicesData.entity";
import { MoreThanOrEqual, Repository } from "typeorm";
import { DevicesService } from "src/devices/service/devices.service";
import { Cron } from "@nestjs/schedule";
import { FindPlaceDTO } from "src/places/dto/find-place.dto";
import { PayloadDto } from "src/auth/dto/payload.dto";
import { ValueDto } from "../dto/value.dto";
import { IdDeviceDto } from "../dto/idDevice.dto";
import {
  intensidadeLuminosa,
  precipitacao,
  temperatura,
  umidade,
  vento,
} from "../functions/devicesSimulation";

@Injectable()
export class UserDevicesDataService {
  constructor(
    private devicesService: DevicesService,
    @Inject("USER_DEVICES_DATA_REPOSITORY")
    private userDeviceDataRepository: Repository<UserDevicesDataEntity>,
  ) {}

  @Cron("0 * * * *")
  async mockDevicesdata() {
    return new Promise(async (resolve, reject) => {
      try {
        const allActiveDevices = await this.devicesService.allActiveDevices();

        const data = await allActiveDevices.map(async (device) => {
          const data = await this.userDeviceDataRepository.create();
          const type = device.type_id.type;
          switch (type) {
            case "Umidade":
              data.value = umidade();
              break;
            case "Temperatura":
              data.value = temperatura();
              break;
            case "Vento":
              data.value = vento();
              break;
            case "Precipitacao":
              data.value = precipitacao();
              break;
            case "Luz":
              data.value = intensidadeLuminosa();
              break;

            default:
              break;
          }

          data.devices_id = device;
          const savedData = await this.userDeviceDataRepository.save(data);
          return savedData;
        });

        await Promise.all(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async saveData(value: ValueDto, idDevice: IdDeviceDto, user: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.devicesService.findDevice(idDevice, user);

        if (device.status == false) {
          throw new ConflictException(
            "The device is disabled. Please enable to save data.",
          );
        }

        const { min_range, max_range } = device.type_id;

        if (value.value < min_range || value.value > max_range) {
          throw new ConflictException(
            "The value is lower or higher the limits of the device",
          );
        }

        const data = await this.userDeviceDataRepository.create();
        data.devices_id = device;
        data.value = value.value;
        await this.userDeviceDataRepository.save(data);

        resolve({
          message: "Data added sucessfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getOverview(idPlace: FindPlaceDTO, user: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      const time = 24;
      try {
        const overview = await this.userDeviceDataRepository.query(
          `SELECT model."id", model."type",model."min_range", model."max_range", model."unit", CAST(ROUND(AVG(UDD."value")) AS INT)
          FROM user_devices_data udd
          JOIN devices dev ON dev.id = udd."devices_id"
          JOIN places plc ON plc.id = dev."place_id"
          JOIN companies cpn ON cpn.id = plc.company_id
          JOIN model_devices model ON model.id = dev."type_id"
          WHERE udd.create_date >= NOW() - INTERVAL '${time} hours' AND dev."status" = true AND dev."place_id" = '${idPlace.id_place}' AND plc.company_id= '${user.id}'
          GROUP BY model."id", model."type", model."min_range", model."max_range"`,
        );

        const sensores_ativos = await this.userDeviceDataRepository.query(
          `select devices.id, devices.name, devices.type_id, model.type, model.unit from devices
           JOIN model_devices model ON model.id = devices.type_id
            where devices.status=true AND devices.place_id = '${idPlace.id_place}'`,
        );

        const currentDate = new Date();
        const timeInterval = new Date(
          currentDate.getTime() - 24 * 60 * 60 * 1000,
        );

        const dados = await Promise.all(
          await sensores_ativos.map(async (sensor) => {
            const value = await this.userDeviceDataRepository.find({
              select: { value: true, createdAt: true },
              where: {
                devices_id: { id: sensor.id },
                createdAt: MoreThanOrEqual(timeInterval),
              },
            });

            const values = await Promise.all(
              await value.map(async (valor) => valor.value),
            );

            const time = await Promise.all(
              await value.map(async (valor) => {
                let hour = valor.createdAt.getHours().toString();
                let min = valor.createdAt.getMinutes().toString();
                hour = this.doubleDigits(hour);
                min = this.doubleDigits(min);

                return `${hour}:${min}`;
              }),
            );

            const dados_sensor = {
              ...sensor,
              ...{ ...{ values } },
              ...{ ...{ time } },
            };
            return dados_sensor;
          }),
        );

        const data = {
          ...{ local: idPlace.id_place },
          ...{ overview },
          ...{ dados },
        };
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  private doubleDigits(x: string) {
    if (x.length == 1) {
      x = `0${x}`;
      return x;
    }
    return x;
  }
}
