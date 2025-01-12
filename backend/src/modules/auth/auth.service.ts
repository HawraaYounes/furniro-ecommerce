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
import { Role } from "../../common/enums/roles.enum";
import { AuthResponses } from "src/constants/responses/en/auth.responses";
import { UserResponses } from "src/constants/responses/en/users.responses";

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userRepository.findOneBy({ email: signInDto.email });
    if (!user) {
      return UserResponses.USER_NOT_FOUND;
    }
    const match = await bcrypt.compare(signInDto.password, user.password);
    if (!match) {
      return AuthResponses.INVALID_PASSWORD;
    }
    const payload = { id: user.id, email: user.email, roles: user.roles };
    const access_token =  await this.jwtService.signAsync(payload);
    return {
      ...AuthResponses.LOGIN_SUCCESS,
      data: { access_token },
    };
    } catch (error) {
      console.log("LOGIN ERROR",error)
    }
    
  }

  async signUp(payload: SignUpDto) {
    const isEmailRegistered = await this.userRepository.findOneBy({email:payload.email});
    if (isEmailRegistered) {
      return AuthResponses.EMAIL_ALREADY_REGISTERED; 
    }
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(payload.password, salt);

    const user: User = new User();
    user.name = payload.name;
    user.email = payload.email;
    user.password = hashPassword;
    user.isActive= true;
    user.roles = payload.roles ?? [Role.User];
    const newUser=await this.userRepository.save(user);
    return {
      ...AuthResponses.SIGNUP_SUCCESS,
      data: plainToClass(User, newUser),
    };
  }
}