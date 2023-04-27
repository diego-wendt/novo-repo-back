import { IsEmail, IsString, IsUUID } from "class-validator";

export class PayloadDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly mail: string;

  @IsEmail()
  readonly cnpj: string;

  @IsString()
  readonly owner: string;

  @IsString()
  readonly phone: string;
}
