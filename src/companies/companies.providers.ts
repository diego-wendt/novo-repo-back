import { DataSource } from "typeorm";
import { CompaniesEntity } from "./entity/company.entity";

export const CompanyProviders = [
  {
    provide: "COMPANY_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CompaniesEntity),
    inject: ["DATA_SOURCE"],
  },
];
