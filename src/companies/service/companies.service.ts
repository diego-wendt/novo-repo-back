import {
  Injectable,
  Inject,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { MoreThanOrEqual, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CompaniesEntity } from "../entity/company.entity";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { ChangeCompanyProfileDTO } from "../dto/change-company-profile.dto";
import { PayloadDto } from "src/auth/dto/payload.dto";
import { randomUUID } from "crypto";
import { GetEmailDto } from "src/auth/dto/getEmail.dto";
import { EmailService } from "src/email/service/email.service";

@Injectable()
export class CompaniesService {
  constructor(
    private emailService: EmailService,
    @Inject("COMPANY_REPOSITORY")
    private companiesRepository: Repository<CompaniesEntity>,
  ) {}

  public async store(company: CreateCompanyDto): Promise<CompaniesEntity> {
    return new Promise(async (resolve, reject) => {
      const newCompany = new CompaniesEntity();
      newCompany.name = company.name;
      newCompany.cnpj = company.cnpj;
      newCompany.owner = company.owner;
      newCompany.mail = company.mail.toLowerCase();
      newCompany.phone = company.phone;

      newCompany.salt = await bcrypt.genSalt(12);
      newCompany.password = await bcrypt.hash(
        company.password,
        newCompany.salt,
      );

      await this.companiesRepository
        .save(newCompany)
        .then(async (returnBd) => {
          if (process.env.MAIL_HOST) {
            this.emailService.sendConfirmationEmail(returnBd);
          } else {
            await this.autoActivation(returnBd);
          }
          resolve(returnBd);
        })
        .catch((error) => {
          let errorStatus = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
          };

          if (+error.code === 23505) {
            errorStatus.status = HttpStatus.CONFLICT;
            errorStatus.message = "The email entered is already registered";
          }
          reject(errorStatus);
        });
    });
  }

  async changeCompanyProfile(
    newProfile: ChangeCompanyProfileDTO,
    user: PayloadDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { phone, password, confirm_password } = newProfile;
        if (password !== confirm_password) {
          throw new BadRequestException("Passwords don't match");
        }
        const company = await this.companiesRepository.findOne({
          where: { id: user.id },
        });
        if (password) {
          if (
            company.password === (await bcrypt.hash(password, company.salt))
          ) {
            throw new BadRequestException(
              "New password must be different from old password",
            );
          }
          company.password = await bcrypt.hash(password, company.salt);
        }
        company.phone = phone;
        await this.companiesRepository.save(company);

        resolve({
          message: "Change made successfully",
          status_code: HttpStatus.OK,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async findCompanyById(id: string): Promise<CompaniesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const company = await this.companiesRepository.findOne({
          where: { id: id },
        });
        if (!company) {
          throw new NotFoundException("Company not found");
        }
        resolve(company);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findCompanyByEmail(email: string): Promise<CompaniesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const company = await this.companiesRepository.findOne({
          where: {
            mail: email.toLowerCase(),
          },
        });
        if (!company) {
          throw new NotFoundException(
            "The email provided is not registered. Please check the email you entered and try again.",
          );
        }
        resolve(company);
      } catch (error) {
        reject(error);
      }
    });
  }

  async registerTemporaryToken(user: CompaniesEntity, token: string) {
    return new Promise(async (resolve, reject) => {
      const company = await this.companiesRepository.findOne({
        where: {
          mail: user.mail,
        },
      });
      if (!company) {
        throw new NotFoundException("Email not found.");
      }

      let currentDateMoreOne = new Date();
      currentDateMoreOne.setDate(currentDateMoreOne.getDate() + 1);
      company.tempToken = await bcrypt.hash(token, company.salt);
      company.tempTokenExpireDate = currentDateMoreOne;
      await this.companiesRepository.update(company.id, company);

      resolve("Temporary token registered successfully");

      try {
      } catch (error) {
        reject(error);
      }
    });
  }

  async registerNewPasswordByEmail(token: GetEmailDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const newPassword = randomUUID();

        const company = await this.companiesRepository.findOne({
          where: {
            mail: token.mail,
          },
        });
        if (!company) {
          throw new NotFoundException("Email not found.");
        }

        const hashToken = await bcrypt.hash(token.token, company.salt);

        const checkToken = await this.companiesRepository.findOne({
          where: {
            mail: token.mail,
            tempToken: hashToken,
            tempTokenExpireDate: MoreThanOrEqual(new Date()),
          },
        });

        if (!checkToken) {
          throw new BadRequestException("Invalid token.");
        }

        const tempTokenExpireDate = company.tempTokenExpireDate;

        company.password = await bcrypt.hash(newPassword, company.salt);
        company.tempToken = null;
        company.tempTokenExpireDate = null;
        await this.companiesRepository.update(company.id, company);
        resolve({ newPassword, tempTokenExpireDate, company });
      } catch (error) {
        reject(error);
      }
    });
  }

  private async autoActivation(company: CompaniesEntity) {
    return new Promise(async (resolve, reject) => {
      try {
        company.is_confirmed = true;
        await this.companiesRepository.update(company.id, company);
        resolve({ message: "Activated successfully" });
      } catch (error) {
        reject(error);
      }
    });
  }

  async changeStatus(GetEmailDto: GetEmailDto): Promise<CompaniesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const company = await this.findCompanyByEmail(GetEmailDto.mail);
        const hash = await bcrypt.hash(company.id, company.salt);
        if (hash != GetEmailDto.token) {
          throw new UnauthorizedException("Invalid token.");
        }

        company.is_confirmed = true;
        await this.companiesRepository.update(company.id, company);

        resolve(company);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getDataCompany(user: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const company = await this.findCompanyById(user.id);

        const { phone } = company;
        resolve({phone});
      } catch (error) {
        reject(error);
      }
    });
  }
}
