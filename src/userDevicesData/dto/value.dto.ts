import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ValueDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: "value", type: "number", example: 10 })
  value: number;
}
