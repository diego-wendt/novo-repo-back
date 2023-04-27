import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ name: 'name', type: 'string', example: 'New name of place' })
  name: string;

  @IsOptional()
  @IsNumber()
  @Max(90)
  @Min(-90)
  @ApiProperty({ name: 'latitude', type: 'number', example: '0' })
  latitude: number;

  @IsOptional()
  @IsNumber()
  @Max(180)
  @Min(-180)
  @ApiProperty({ name: 'longitude', type: 'number', example: '0' })
  longitude: number;
}
