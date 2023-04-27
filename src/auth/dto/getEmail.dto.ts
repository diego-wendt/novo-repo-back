import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetEmailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: "mail", type: "string", example: "example@example.com" })
  mail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: "token",
    type: "string",
    example: "a68f77c6-f356-4d78-a5f8-bd57424e3f52",
  })
  token: string;
}
