import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { CompaniesEntity } from "src/companies/entity/company.entity";
import { modelo_email_cadastrar_token } from "./modeloEmail/email.cadastraToken";
import { modelo_email_cadastrar_senha } from "./modeloEmail/email.cadastraSenha";
import * as bcrypt from "bcrypt";
import { modelo_email_confirmar_email } from "./modeloEmail/email.confirmaEmail";
import { modelo_email_registro_realizado } from "./modeloEmail/email.confirmaRealizada";

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailWithToken(user: CompaniesEntity, token: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.mailerService.sendMail({
          to: user.mail,
          from: process.env.MAIL_FROM,
          subject: "Olá. Você solicitou a troca de senha.",
          html: modelo_email_cadastrar_token(user, token),
        });
        resolve({ message: "Email sent successfully" });
      } catch (error) {
        reject(error);
      }
    });
  }

  async sendEmailWithNewPassword(retorno) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.mailerService.sendMail({
          to: retorno.company.mail,
          from: process.env.MAIL_FROM,
          subject: "Olá. Sua nova senha chegou.",
          html: modelo_email_cadastrar_senha(retorno),
        });

        resolve("Email sent successfully");
      } catch (error) {
        reject(error);
      }
    });
  }

  async sendConfirmationEmail(company: CompaniesEntity) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await bcrypt.hash(company.id, company.salt);
        await this.mailerService.sendMail({
          to: company.mail,
          from: process.env.MAIL_FROM,
          subject: `Olá ${company.owner} - ${company.name}. Confirmação de cadastro a SmartFarm`,
          html: modelo_email_confirmar_email(company, token),
        });
        resolve("Email sent successfully");
      } catch (error) {
        reject(error);
      }
    });
  }

  async sendRegistrationConfirmedEmail(company: CompaniesEntity) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.mailerService.sendMail({
          to: company.mail,
          from: process.env.MAIL_FROM,
          subject: `Olá ${company.owner} - ${company.name}. Seja bem vindo a SmartFarm`,
          html: modelo_email_registro_realizado(company),
        });
        resolve("Email sent successfully");
      } catch (error) {
        reject(error);
      }
    });
  }
}
