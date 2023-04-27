import { DataSource } from "typeorm";
import { PlacesEntity } from "./entity/places.entity";

export const PlacesProviders = [
  {
    provide: "PLACE_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PlacesEntity),
    inject: ["DATA_SOURCE"],
  },
];
