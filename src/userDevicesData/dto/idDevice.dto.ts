import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class IdDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: "id_device",
    type: "string",
    example: "48de7d0e-ce68-49b7-959d-ab6974a127ec",
  })
  id_device: string;
}
