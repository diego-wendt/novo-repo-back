import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Put,
  UseGuards,
  Request,
  HttpException,
  Get,
} from "@nestjs/common";
import { CompaniesService } from "../service/companies.service";
import { CreateCompanyDto } from "../dto/create-company.dto";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ApiUpdateCompany } from "../documentation";
import { ChangeCompanyProfileDTO } from "../dto/change-company-profile.dto";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";
import { ApiGetDataCompany } from "../documentation/api-company-getDataCompany";
import { ApiCompanyCadastro } from "../documentation/api-company-cadastro.doc";

@ApiTags("Empresa")
@Controller("empresa")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post("cadastro")
  @ApiOperation(ApiCompanyCadastro.apiOperation)
  @ApiCreatedResponse(ApiCompanyCadastro.create)
  @ApiConflictResponse(ApiCompanyCadastro.conflict)
  @ApiInternalServerErrorResponse(
    ApiCompanyCadastro.internalServerError,
  )
  public async store(@Body() company: CreateCompanyDto, @Res() res) {
    try {
      await this.companiesService.store(company);
      const response = {
        status_code: HttpStatus.CREATED,
        message: "Company created successfully",
      };
      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put("/perfil")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(ApiUpdateCompany.apiOperation)
  @ApiOkResponse(ApiUpdateCompany.updateCompany)
  @ApiInternalServerErrorResponse(
    ApiUpdateCompany.internalServerErrorUpdateCompany,
  )
  async changeCompanyProfile(
    @Body() newProfile: ChangeCompanyProfileDTO,
    @Request() payload,
    @Res() res,
  ) {
    try {
      const { user } = payload;
      await this.companiesService.changeCompanyProfile(newProfile, user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Company updated succssesfully",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get("dados")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(ApiGetDataCompany.apiOperation)
  @ApiOkResponse(ApiGetDataCompany.okResponse)
  @ApiNotFoundResponse(ApiGetDataCompany.notFound)
  @ApiInternalServerErrorResponse(ApiGetDataCompany.internalServerError)
  async getDataCompany(@Request() payload, @Res() res) {
    try {
      const { user } = payload;
      const data = await this.companiesService.getDataCompany(user);
      const response = {
        status_code: HttpStatus.OK,
        message: "Company phone get successfully",
      };
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
