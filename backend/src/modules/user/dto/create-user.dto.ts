import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  import { Role } from 'src/modules/enums/roles.enum';

  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have at least 3 characters.' })
    @IsAlphanumeric(null, {
      message: 'Username does not allow other than alpha numeric chars.',
    })
    username: string;
  
    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
    })
    password: string;

    @IsNotEmpty()
    @IsEnum(Role, { each: true, message: 'Invalid role provided.' })
    roles?: Role[] ; // Default to Role.User if no role is provided
  }