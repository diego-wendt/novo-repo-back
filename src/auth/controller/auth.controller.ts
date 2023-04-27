import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Query,
  Get,
} from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { CredentialsDTO } from "../dto/credentials.dto";
import { ForgotPasswordDTO } from "../dto/forgot-password.dto";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ApiForgotPassword, ApiLogin } from "../documentation";
import { GetEmailDto } from "../dto/getEmail.dto";
import { ApiGetConfirmationEmail } from "../documentation/api-getConfirmationEmail.doc";
import { ApiGetEmailChangePassword } from "../documentation/api-getEmailChangePassword.doc";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @ApiOkResponse(ApiLogin.okLogin)
  @ApiOperation(ApiLogin.apiOperation)
  @ApiBadRequestResponse(ApiLogin.badRequestLogin)
  @ApiUnauthorizedResponse(ApiLogin.unauthorizedLogin)
  async login(@Body() credentialsDto: CredentialsDTO, @Res() res) {
    try {
      const login = await this.authService.login(credentialsDto);
      const response = {
        status_code: HttpStatus.OK,
        message: "Login success",
        data: login,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post("/esqueci-senha")
  @ApiOperation(ApiForgotPassword.apiOperation)
  @ApiOkResponse(ApiForgotPassword.okForgotPassword)
  @ApiNotFoundResponse(ApiForgotPassword.notFoundForgotPassword)
  @ApiInternalServerErrorResponse(
    ApiForgotPassword.internalServerErrorForgotPassword,
  )
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDTO,
    @Res() res,
  ) {
    try {
      const mail = await this.authService.forgotPassword(forgotPasswordDto);
      const response = {
        statusCode: HttpStatus.OK,
        message: "Mail founded",
        data: mail,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(ApiGetEmailChangePassword.apiOperation)
  @ApiOkResponse(ApiGetEmailChangePassword.okForgotPassword)
  @ApiNotFoundResponse(ApiGetEmailChangePassword.notFoundForgotPassword)
  @ApiBadRequestResponse(ApiGetEmailChangePassword.invalidToken)
  @Get("altera-senha")
  async getEmailChangePassword(@Query() GetEmailDto: GetEmailDto, @Res() res) {
    try {
      await this.authService.getEmailWithToken(GetEmailDto);
      const response = {
        status_code: HttpStatus.OK,
        message: "Successful operation",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(ApiGetConfirmationEmail.apiOperation)
  @ApiOkResponse(ApiGetConfirmationEmail.okForgotPassword)
  @ApiNotFoundResponse(ApiGetConfirmationEmail.notFoundForgotPassword)
  @ApiBadRequestResponse(ApiGetConfirmationEmail.invalidToken)
  @Get("confirma-email")
  async getConfirmationEmail(@Query() GetEmailDto: GetEmailDto, @Res() res) {
    try {
      await this.authService.getConfirmationEmail(GetEmailDto);
      const response = {
        status_code: HttpStatus.OK,
        message: "Successful operation",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
