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
import { SIGNUP_SUCCESS } from "src/constants/responses/en/auth/signup-success";
import { EMAIL_ALREADY_REGISTERED } from "src/constants/responses/en/auth/email-already-registered";
import { Role } from "../enums/roles.enum";

@Injectable()
export class AuthService {

  constructor(
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
    const access_token =  await this.jwtService.signAsync(payload);
    return {
      ...LOGIN_SUCCESS,
      data: { access_token },
    };
  }

  async signUp(payload: SignUpDto) {
    const isEmailRegistered = await this.userRepository.findOneBy({email:payload.email});
    if (isEmailRegistered) {
      return EMAIL_ALREADY_REGISTERED; 
    }
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(payload.password, salt);

    const user: User = new User();
    user.name = payload.name;
    user.email = payload.email;
    user.password = hashPassword;
    user.roles = payload.roles ?? [Role.User];
    const newUser=await this.userRepository.save(user);
    return {
      ...SIGNUP_SUCCESS,
      data: plainToClass(User, newUser),
    };
  }
}