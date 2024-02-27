import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";

// ? Librerias para comprobar la vigencia de un Token
// import { Get, UseGuards } from "@nestjs/common";
// import { AuthGuard } from "./guards/auth.guard";

@Controller( "auth" )
export class AuthController {

	constructor( private readonly authService: AuthService ) {}

	@Post( "login" )
	@HttpCode( 200 )
	login( @Body() loginUserDto: LoginUserDto ) {
		return this.authService.login( loginUserDto );
	}

	@Post( "register" )
	register( @Body() registerUserDto: RegisterUserDto ) {
		return this.authService.register( registerUserDto );
	}

	// ? Metodo para comprobar la vigencia de un Token
	// @Get( "check-auth" )
	// @UseGuards( AuthGuard )
	// checkAuth() {
	// 	return { message: "Autenticación de token correcta" }
	// }
}
