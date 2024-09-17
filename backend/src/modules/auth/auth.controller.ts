import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public-strategy";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    signUp(@Body() body: SignUpDto) {
        return this.authService.signUp(body);
    }
}