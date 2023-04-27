import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class RemovePlaceDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: "id_place",
    type: "string",
    example: "123e4567-e89b-12d3-a456-426655440000",
  })
  id_place: string;

}
