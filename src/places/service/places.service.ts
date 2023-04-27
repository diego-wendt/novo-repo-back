import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PlacesEntity } from "../entity/places.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreatePlaceDto } from "../dto/create-place.dto";
import { UpdatePlaceDto } from "../dto/update-place.dto";
import { FindPlaceDTO } from "../dto/find-place.dto";
import { CompaniesEntity } from "src/companies/entity/company.entity";
import { PayloadDto } from "src/auth/dto/payload.dto";
import { GetLocaisReturnDto } from "../dto/get-locais-return.dto";
import { CompaniesService } from "src/companies/service/companies.service";

@Injectable()
export class PlacesService {
  constructor(
    @Inject("PLACE_REPOSITORY")
    private placeRepository: Repository<PlacesEntity>,
    private companiesService: CompaniesService
  ) { }

  async create(createPlaceDto: CreatePlaceDto, user: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const place = new PlacesEntity();
        place.latitude = createPlaceDto.latitude;
        place.longitude = createPlaceDto.longitude;
        place.name = createPlaceDto.name;
        place.company_id = await this.companiesService.findCompanyById(user.id);
        await this.placeRepository.save(place);
        resolve({ message: "Place successfully registered." });
      } catch (error) {
        reject(error);
      }
    });
  }
  
  async updatePlace(
    updatePlaceDto: UpdatePlaceDto,
    param: FindPlaceDTO,
    user: PayloadDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const place = await this.findPlace(param, user);

        place.latitude = updatePlaceDto.latitude;
        place.longitude = updatePlaceDto.longitude;
        place.name = updatePlaceDto.name;
        await this.placeRepository.update(
          { id: param.id_place },
          {
            name: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
          },
        );
        resolve({ message: "Place successfully updated" });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getPlaces(companyId: string): Promise<GetLocaisReturnDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const places = await this.placeRepository
          .createQueryBuilder("places")
          .leftJoin("places.company_id", "company")
          .where("company.id = :companyId", { companyId })
          .select([
            "places.id",
            "places.name",
            "COUNT(devices.id) AS num_devices",
            "places.latitude",
            "places.longitude",
          ])
          .leftJoin("places.devices", "devices")
          .groupBy("places.id")
          .getRawMany();

        resolve(places);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findPlace(
    idPlace: FindPlaceDTO,
    user: PayloadDto,
  ): Promise<PlacesEntity> {
    return await new Promise(async (resolve, reject) => {
      try {
        const place = await this.placeRepository.findOne({
          where: {
            id: idPlace.id_place,
            company_id: { id: user.id },
          },
        });

        if (!place) {
          throw new NotFoundException("Place not found.");
        }
        resolve(place);
      } catch (error) {
        reject(error);
      }
    });
  }

  async deletePlace(id_place: FindPlaceDTO, user: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const place = await this.findPlace(id_place, user);

        const hasDevices = await this.placeRepository.count({
          where: {
            devices: { place_id: { id: id_place.id_place }, status: true },
          },
          relations: { devices: true },
        });

        if (hasDevices > 0) {
          throw new ConflictException("Place has active devices.");
        }

        await this.placeRepository.softDelete(place.id);

        resolve({ message: "Place removed successfully" });
      } catch (error) {
        reject(error);
      }
    });
  }
}
