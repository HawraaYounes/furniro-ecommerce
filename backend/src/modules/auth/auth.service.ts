import { ConflictException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";
import * as bcrypt from 'bcrypt';
import { plainToClass } from "class-transformer";
import { User } from "../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { USER_NOT_FOUND } from "src/constants/responses/en/user/user-not-found";
import { INVALID_PASSWORD } from "src/constants/responses/en/auth/invalid-password";
import { LOGIN_SUCCESS } from "src/constants/responses/en/auth/login-success";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email });
    if (!user) {
      return USER_NOT_FOUND
    }
    const match = await bcrypt.compare(signInDto.password, user.password);
    if (!match) {
      return INVALID_PASSWORD;
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    const access_token = await await this.jwtService.signAsync(payload);
    return {
      ...LOGIN_SUCCESS,
      data: { access_token }, 
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
    return plainToClass(User, newUser);
  }
}