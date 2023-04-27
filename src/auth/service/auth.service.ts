import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CredentialsDTO } from "../dto/credentials.dto";
import { CompaniesEntity } from "src/companies/entity/company.entity";
import { ForgotPasswordDTO } from "src/auth/dto/forgot-password.dto";
import { LoginReturnDto } from "../dto/login-return.dto";
import { CompaniesService } from "src/companies/service/companies.service";
import { randomUUID } from "crypto";
import { EmailService } from "src/email/service/email.service";
import { GetEmailDto } from "../dto/getEmail.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private companyService: CompaniesService,
    private emailService: EmailService,
    @Inject("COMPANY_REPOSITORY")
    private companyRepository: Repository<CompaniesEntity>,
  ) {}

  async login(credentialsDTO: CredentialsDTO): Promise<LoginReturnDto> {
    return await new Promise(async (resolve, reject) => {
      try {
        const company = await this.checkCredentials(credentialsDTO);

        if (!company) {
          throw new BadRequestException(
            "Unable to login, invalid password or username.",
          );
        }

        if (!company.is_confirmed) {
          this.emailService.sendConfirmationEmail(company);

          throw new UnauthorizedException(
            "Unauthorized access. Please access your e-mail and confirm your registration.",
          );
        }

        const jwtPayload = {
          id: company.id,
          mail: company.mail.toLowerCase(),
          name: company.name,
          cnpj: company.cnpj,
          phone: company.phone,
          owner: company.owner,
        };

        const token = await this.jwtService.sign(jwtPayload, {
          secret: process.env.JWT_SECRET,
        });

        resolve({ ...jwtPayload, token });
      } catch (error) {
        reject(error);
      }
    });
  }

  async checkCredentials(credentials: CredentialsDTO) {
    const { mail, password } = credentials;
    const company = await this.companyRepository.findOne({
      where: {
        mail: mail.toLowerCase(),
      },
    });

    if (company && (await company.checkPassword(password))) {
      return company;
    }
    return null;
  }

  private async hashPassword(senha: string, salt: string): Promise<string> {
    return bcrypt.hash(senha, salt);
  }

  async validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({
          code: 401,
          detail: "JWT expired.",
        });
      }
    });
  }

  async decodedToken(jwtToken: string) {
    return await this.jwtService.decode(jwtToken);
  }

  public async forgotPassword(
    ForgotPasswordDTO: ForgotPasswordDTO,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { mail } = ForgotPasswordDTO;
        const user = await this.companyService.findCompanyByEmail(mail);
        if (user && process.env.MAIL_HOST) {
          const token = randomUUID();
          await this.companyService.registerTemporaryToken(user, token);
          this.emailService.sendEmailWithToken(user, token);
        }
        if (user) {
          resolve(user.mail);
        }
        throw new NotFoundException(
          "The email provided is not registered. Please check the email you entered and try again.",
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async getEmailWithToken(GetEmailDto: GetEmailDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const retorno = await this.companyService.registerNewPasswordByEmail(
          GetEmailDto,
        );
        this.emailService.sendEmailWithNewPassword(retorno);

        resolve("New password registered and sent successfully");
      } catch (error) {
        reject(error);
      }
    });
  }

  async getConfirmationEmail(GetEmailDto: GetEmailDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const company = await this.companyService.changeStatus(GetEmailDto);
        this.emailService.sendRegistrationConfirmedEmail(company);
        resolve("Register finished successfully");
      } catch (error) {
        reject(error);
      }
    });
  }
}
