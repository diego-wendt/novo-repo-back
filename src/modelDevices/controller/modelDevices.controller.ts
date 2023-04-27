import { Controller, Get, HttpException, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { ModelDevicesService } from "../service/modelDevices.service";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ApiModelDevices } from "../documentation";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";


@ApiTags("Sensores Disponíveis")
@Controller("sensores-disponiveis")
export class ModelDevicesController {
  constructor(private readonly modelDevicesService: ModelDevicesService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse(ApiModelDevices.unauthorizedModelDevices)
  @ApiOperation(ApiModelDevices.apiOperation)
  @ApiOkResponse(ApiModelDevices.okModelDevices)
  @ApiInternalServerErrorResponse(ApiModelDevices.internalServerErrorModelDevices)
  async findAllModels(@Res() res) {
    try {
      const device = await this.modelDevicesService.findAllModels();
      const response = {
        status_code: HttpStatus.OK,
        message: "Succssesfully done",
        data: device,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
