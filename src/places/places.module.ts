import { Module } from "@nestjs/common";
import { PlacesService } from "./service/places.service";
import { PlacesController } from "./controller/places.controller";
import { DatabaseProviders } from "src/core/database/database.providers";
import { PlacesProviders } from "./places.providers";
import { CompanyProviders } from "src/companies/companies.providers";
import { CompaniesModule } from "src/companies/companies.module";

@Module({
  imports:[CompaniesModule],
  controllers: [PlacesController],
  providers: [PlacesService,
    ...DatabaseProviders,
    ...PlacesProviders,
    ...CompanyProviders],
  exports: [PlacesService],
})
export class PlacesModule { }
