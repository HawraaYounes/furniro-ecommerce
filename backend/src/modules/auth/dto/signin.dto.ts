import {
  IsEmail,
  IsNotEmpty,
  Matches,
} from 'class-validator';


export class SignInDto {

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  password: string;
}