import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../user/dto/create-user.dto";
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async signIn(email, pass) {
    const user = await this.usersService.findOneBy(email);
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found!',
      });
    }
    if (user?.password !== pass) {
      console.log("db pass",user.password, "request pass",pass)
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserDto) {
    const user = await this.usersService.createUser(payload);
    return user;
  }
}