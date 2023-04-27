import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CredentialsDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ name: 'mail', type: 'string', example: 'example@example.com' })
  readonly mail: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty({ name: 'password', type: 'string', example: 'StrongWeekPassword123' })
  readonly password: string;
}
