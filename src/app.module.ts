import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { PlacesModule } from "./places/places.module";
import { DevicesModule } from "./devices/devices.module";
import { CompaniesModule } from "./companies/companies.module";
import { AuthModule } from "./auth/auth.module";
import { ModelDevicesModule } from "./modelDevices/modelDevices.module";
import { UserDevicesDataModule } from "./userDevicesData/userDevicesData.module";
import { ScheduleModule } from "@nestjs/schedule";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailModule } from "./email/email.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PlacesModule,
    DevicesModule,
    CompaniesModule,
    AuthModule,
    ModelDevicesModule,
    UserDevicesDataModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
      }),
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
