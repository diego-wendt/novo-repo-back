import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreatePlaceDto {

    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    @ApiProperty({ name: 'name', type: 'string', example: 'Name of place' })
    name: string;

    @IsNotEmpty({ message: 'Latitude is required' })
    @IsNumber()
    @Max(90)
    @Min(-90)
    @ApiProperty({ name: 'latitude', type: 'number', example: '10' })
    latitude: number;

    @IsNotEmpty({ message: 'Longitude is required' })
    @IsNumber()
    @Max(180)
    @Min(-180)
    @ApiProperty({ name: 'longitude', type: 'number', example: '10' })
    longitude: number;
}