import { ConflictException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneBy(signInDto.email);
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found!',
      });
    }
    const match = await bcrypt.compare(signInDto.password, user.password);
    if (!match) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect email and password!',
      });
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(payload: SignUpDto) {
    const user = await this.usersService.findOneBy(payload.email);
    if (user) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Email address is already registered. Please use a different email or log in.',
      });
    }
    const newUser = await this.usersService.createUser(payload);
    return newUser;
  }
}