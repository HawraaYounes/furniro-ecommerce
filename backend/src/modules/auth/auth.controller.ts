import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public-strategy";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }
    @Public()
    @ApiBody({ type: SignInDto })
    @ApiOkResponse({
        description: 'User successfully logged in.',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid email or password.',
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
    })
    @ApiBadRequestResponse({
        description: 'Validation errors or bad request.',
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error occurred during sign-in.',
    })
    @Post("login")
    signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body);
    }

    @Public()
    @ApiBody({ type: SignUpDto })
    @ApiCreatedResponse({
        description: 'User successfully Signed Up.',
    })
    @ApiConflictResponse({
        description: 'When the email is already taken.',
    })
    @ApiBadRequestResponse({
        description: 'Validation errors or bad request.',
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error occurred while processing the signup.',
    })
    @Post("signup")
    signUp(@Body() body: SignUpDto) {
        return this.authService.signUp(body);
    }
}