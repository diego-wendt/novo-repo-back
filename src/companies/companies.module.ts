import { Module } from "@nestjs/common";
import { CompaniesService } from "./service/companies.service";
import { CompaniesController } from "./controller/companies.controller";
import { DatabaseProviders } from "src/core/database/database.providers";
import { CompanyProviders } from "./companies.providers";
import { EmailModule } from "src/email/email.module";

@Module({
  imports: [EmailModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, ...DatabaseProviders, ...CompanyProviders],
  exports: [CompaniesService],
})
export class CompaniesModule {}
