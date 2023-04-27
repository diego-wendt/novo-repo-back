import {
  Controller,
  Body,
  Param,
  Post,
  HttpException,
  Get,
  UseGuards,
  Request,
  Put,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { DevicesService } from "../service/devices.service";
import { createDeviceDto } from "../dto/createDevice.dto";
import { FindPlaceDTO } from "src/places/dto/find-place.dto";
import { RemoveDeviceDto } from "../dto/removeDevice.dto";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import {
  ApiRemoveDevice,
  ApiGetDevices,
  ApiCreateDevices,
} from "../documentation";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";
import { IdDeviceDto } from "src/userDevicesData/dto/idDevice.dto";

@ApiTags("Sensores")
@Controller("sensores")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) { }

  @Post("vincular-sensor/:id_place")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse(ApiCreateDevices.unauthorizedCreateDevice)
  @ApiOperation(ApiCreateDevices.apiOperation)
  @ApiCreatedResponse(ApiCreateDevices.deviceCreated)
  @ApiConflictResponse(ApiCreateDevices.deviceConflict)
  @ApiNotFoundResponse(ApiCreateDevices.deviceNotFound)
  @ApiInternalServerErrorResponse(ApiCreateDevices.deviceInternalServerError)
  async createDevice(
    @Body() createDevice: createDeviceDto,
    @Param() idPlace: FindPlaceDTO,
    @Request() payload,
    @Res() res
  ) {
    try {
      const { user } = payload;
      await this.devicesService.createDevice(
        createDevice,
        idPlace,
        user,
      );
      const response = {
        status_code: HttpStatus.CREATED,
        message: "Successfully done",
      };
      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post("desvincular-sensor")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse(ApiRemoveDevice.unauthorizedRemoveDevice)
  @ApiOperation(ApiRemoveDevice.apiOperation)
  @ApiOkResponse(ApiRemoveDevice.okRemoveDevice)
  @ApiNotFoundResponse(ApiRemoveDevice.notFoundRemoveDevice)
  @ApiInternalServerErrorResponse(
    ApiRemoveDevice.internalServerErrorRemoveDevice,
  )
  async removeDevice(
    @Body() removeDevice: RemoveDeviceDto,
    @Request() payload,
    @Res() res,
  ) {
    try {
      const { user } = payload;
      await this.devicesService.removeDevice(removeDevice, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Successfully done",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(":id_place")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse(ApiGetDevices.unauthorizedListDevice)
  @ApiOperation(ApiGetDevices.apiOperation)
  @ApiOkResponse(ApiGetDevices.okGetDevices)
  @ApiNotFoundResponse(ApiGetDevices.notFoundGetDevices)
  @ApiInternalServerErrorResponse(ApiGetDevices.internalServerErrorGetDevices)
  async findDevicesFromPlace(
    @Param() idPlace: FindPlaceDTO,
    @Request() payload,
    @Res() res,
  ) {
    const { user } = payload;
    try {
      const devices = await this.devicesService.findDevicesFromPlace(idPlace, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Successfully done",
        data: devices,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put("altera-status/:id_device")
  async changeStatusDevice(@Param() idDevice: IdDeviceDto, @Request() payload, @Res() res) {
    const { user } = payload;
    try {
      await this.devicesService.changeStatusDevice(idDevice, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Changed successfully",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
