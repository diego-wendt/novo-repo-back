import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthController } from "./controller/auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/core/auth/guards/strategy/jwt.strategy";
import { DatabaseProviders } from "src/core/database/database.providers";
import { CompanyProviders } from "src/companies/companies.providers";
import { EmailModule } from "src/email/email.module";
import { CompaniesModule } from "src/companies/companies.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
    EmailModule,
    CompaniesModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    ...DatabaseProviders,
    ...CompanyProviders,
  ],
})
export class AuthModule {}
