import { PlacesService } from "../service/places.service";
import { CreatePlaceDto } from "../dto/create-place.dto";
import { HttpException } from "@nestjs/common/exceptions";
import {
  Controller,
  Post,
  Body,
  Request,
  Put,
  Param,
  Get,
  Delete,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { UpdatePlaceDto } from "../dto/update-place.dto";
import { FindPlaceDTO } from "../dto/find-place.dto";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ApiCreatePlace, ApiGetPlaces, ApiDeletePlace, ApiAlterPlace } from "../documentation";


@ApiTags("Locais")
@Controller("locais")
export class PlacesController {
  constructor(private readonly placesService: PlacesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation(ApiCreatePlace.apiOperation)
  @ApiUnauthorizedResponse(ApiCreatePlace.unauthorizedCreatePlace)
  @ApiCreatedResponse(ApiCreatePlace.createPlace)
  @ApiBadRequestResponse(ApiCreatePlace.badRequestPlace)
  async createPlace(
    @Body() createPlaceDto: CreatePlaceDto,
    @Request() payload,
    @Res() res,
  ) {
    try {
      const { user } = payload;
      await this.placesService.create(createPlaceDto, user);
      const response = {
        status_code: HttpStatus.CREATED,
        message: "Place successfully registered.",
      };
      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(ApiGetPlaces.apiOperation)
  @ApiOkResponse(ApiGetPlaces.okGetPlaces)
  @ApiUnauthorizedResponse(ApiGetPlaces.unauthorizedGetPlaces)
  @ApiInternalServerErrorResponse(ApiGetPlaces.internalServerErrorGetPlaces)
  @Get()
  async getPlaces(@Request() payload, @Res() res) {

    try {
      const { user } = payload;
      const localsDevices = await this.placesService.getPlaces(user.id);
      const response = {
        status_code: HttpStatus.OK,
        message: "Successful query",
        data: localsDevices,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @ApiOperation(ApiDeletePlace.apiOperation)
  @ApiOkResponse(ApiDeletePlace.deletePlace)
  @ApiUnauthorizedResponse(ApiDeletePlace.unauthorizedDeletePlace)
  @ApiNotFoundResponse(ApiDeletePlace.notFoundPlace)
  @ApiInternalServerErrorResponse(
    ApiDeletePlace.internalServerErrorDeletePlaces,
  )
  @UseGuards(JwtAuthGuard)
  @Delete(":id_place")
  async deleteById(@Param() idPlace: FindPlaceDTO, @Request() payload, @Res() res) {
    try {
      const { user } = payload;
      await this.placesService.deletePlace(idPlace, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Place removed successfully",
      };
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  @Put(":id_place")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(ApiAlterPlace.apiOperation)
  @ApiUnauthorizedResponse(ApiAlterPlace.unauthorizedEditPlace)
  @ApiOkResponse(ApiAlterPlace.alterPlace)
  @ApiNotFoundResponse(ApiAlterPlace.notFoundPlace)
  @ApiInternalServerErrorResponse(ApiAlterPlace.internalServerErrorAlterPlaces)
  public async updatePlace(
    @Body() updatePlaceDto: UpdatePlaceDto,
    @Param() idPlace: FindPlaceDTO,
    @Request() payload,
    @Res() res,
  ) {
    try {
      const { user } = payload;
      await this.placesService.updatePlace(updatePlaceDto, idPlace, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Place updated successfully",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

}
