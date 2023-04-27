import { ApiProperty } from "@nestjs/swagger";

export class modelDevicesDto {
  @ApiProperty({ name: "id", type: "string", example: "1" })
  id: string;

  @ApiProperty({
    name: "name",
    type: "string",
    example: "Sensor de Umidade do Solo",
  })
  name: string;

  @ApiProperty({ name: "type", type: "string", example: "umidade_do_solo" })
  type: string;

  @ApiProperty({ name: "min_range", type: "number", example: "-50" })
  min_range: number;

  @ApiProperty({ name: "max_range", type: "number", example: "100" })
  max_range: number;

  @ApiProperty({ name: "barcode", type: "string", example: "987654321" })
  barcode: string;

  @ApiProperty({ name: "batch", type: "string", example: "DEF456" })
  batch: string;
}
