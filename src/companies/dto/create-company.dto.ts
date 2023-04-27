import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { Match } from "src/common/decorators/match.decorator";
import { IsCnpj } from "src/common/decorators/is-cnpj.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "name", type: "string", example: "Name of company" })
  readonly name: string;

  @IsCnpj()
  @ApiProperty({ name: "cnpj", type: "string", example: "57000980000140" })
  readonly cnpj: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: "owner",
    type: "string",
    example: "Name owner of company",
  })
  readonly owner: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    name: "mail",
    type: "string",
    example: "example@example.com",
  })
  readonly mail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "phone", type: "string", example: "99999999999" })
  readonly phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @ApiProperty({
    name: "password",
    type: "string",
    example: "StrongWeekPassword123",
  })
  readonly password: string;

  @Match(["password", "equals"])
  @ApiProperty({
    name: "confirm_password",
    type: "string",
    example: "StrongWeekPassword123",
  })
  readonly confirm_password: string;
}
