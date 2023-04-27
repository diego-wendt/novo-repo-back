import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class RemoveDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: "id_place",
    type: "string",
    example: "bab8fe56-7c6a-4993-bb88-2c2c28b3d871",
  })
  id_place: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    name: "id_device",
    type: [String],
    example: [
      "eae31547-7a0a-4974-9a61-911a37513dc2",
      "eaarg547-7a0a-4974-9a61-911a37513dc2",
    ],
  })
  id_device: string[];
}
