import {
  Body,
  Controller,
  HttpException,
  Param,
  UseGuards,
  Post,
  Get,
  Request,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { UserDevicesDataService } from "../service/userDevicesData.service";
import { ValueDto } from "../dto/value.dto";
import { IdDeviceDto } from "../dto/idDevice.dto";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { FindPlaceDTO } from "src/places/dto/find-place.dto";
import { ApiPostUserDevicesData, ApiGetUserDevicesData } from "../documentation";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";

@ApiTags("Dados Sensores")
@Controller("dados-sensor")
export class UserDevicesDataController {
  constructor(
    private readonly userDevicesDataService: UserDevicesDataService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse(ApiPostUserDevicesData.unauthorizedUserDevicesData)
  @ApiOkResponse(ApiPostUserDevicesData.okUserDevicesData)
  @ApiInternalServerErrorResponse(
    ApiPostUserDevicesData.internalServerErrorUserDevicesData,
  )
  @ApiConflictResponse(ApiPostUserDevicesData.conflictUserDevicesData)
  @ApiOperation(ApiPostUserDevicesData.apiOperation)
  @Post(":id_device")
  async saveData(
    @Body() value: ValueDto,
    @Param() idDevice: IdDeviceDto,
    @Request() payload,
    @Res() res,
  ) {
    try {
      const { user } = payload;
      await this.userDevicesDataService.saveData(value, idDevice, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Data saved succssesfully",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse(ApiGetUserDevicesData.unauthorizedUserDevicesData)
  @ApiOkResponse(ApiGetUserDevicesData.okUserDevicesData)
  @ApiInternalServerErrorResponse(
    ApiGetUserDevicesData.internalServerErrorUserDevicesData,
  )
  @ApiOperation(ApiGetUserDevicesData.apiOperation)
  @Get("overview/:id_place")
  async overview(@Param() idPlace: FindPlaceDTO, @Request() payload, @Res() res) {
    try {
      const { user } = payload;
      const placeOverview = await this.userDevicesDataService.getOverview(idPlace, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Succssesfully done",
        data: placeOverview,
      }
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
