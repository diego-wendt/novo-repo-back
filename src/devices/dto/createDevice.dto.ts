import { ApiProperty } from "@nestjs/swagger";
import {
  IsMACAddress,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class createDeviceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "name", type: "string", example: "Name of company" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "type_id", type: "string", example: "1" })
  type_id: string;

  @IsString()
  @IsNotEmpty()
  @IsMACAddress({ no_colons: true })
  @ApiProperty({ name: "mac_address", type: "string", example: "001B44113AB7" })
  mac_address: string;
}
