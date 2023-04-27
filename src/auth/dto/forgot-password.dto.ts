import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ name: 'mail', type: 'string', example: 'example@example.com' })
  readonly mail: string;
}
