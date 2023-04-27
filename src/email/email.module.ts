import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./service/email.service";

@Module({
  imports: [MailerModule],
  controllers: [],
  providers: [EmailService,MailerModule],
  exports:[EmailService]
})
export class EmailModule {}
