// pnpm install class-validator --save  //then use it
import { IsString, IsEmail } from 'class-validator';
export class CreateAuthDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  lastName: string;
}
