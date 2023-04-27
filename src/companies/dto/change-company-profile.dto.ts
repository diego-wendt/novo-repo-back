import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { Match } from "src/common/decorators/match.decorator";

export class ChangeCompanyProfileDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ name: "phone", type: "string", example: "99999999999" })
  readonly phone: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @ApiProperty({
    name: "password",
    type: "string",
    example: "StrongWeekPassword123",
  })
  readonly password: string;

  @ValidateIf((dto) => dto.password)
  @IsNotEmpty()
  @Match(["password", "equals"])
  @ApiProperty({
    name: "confirm_password",
    type: "string",
    example: "StrongWeekPassword123",
  })
  readonly confirm_password: string;
}
