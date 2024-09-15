import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public-strategy";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    signUp(@Body() signUpDto: CreateUserDto) {
        const payload = {
            name: signUpDto.name,
            email: signUpDto.email,
            password: signUpDto.password,

        }
        return this.authService.signUp(payload);
    }
}