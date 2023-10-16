// pnpm install class-validator --save  //then use it
import { IsString, IsEmail } from 'class-validator';
export class signinAuthDto {
  @IsEmail()
  email: string;
}
