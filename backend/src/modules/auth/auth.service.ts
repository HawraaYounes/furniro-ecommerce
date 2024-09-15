import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";
@Injectable()
export class AuthService {
  
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneBy(signInDto.email);
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found!',
      });
    }
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(payload: SignUpDto) {
    const user = await this.usersService.createUser(payload);
    return user;
  }
}