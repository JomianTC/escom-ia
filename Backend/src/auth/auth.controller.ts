import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { RegisterAdminDto } from "./dto/register-admin.dto";

// ? Librerias para comprobar la vigencia de un Token
import { Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";

@Controller( "auth" )
export class AuthController {

	constructor( private readonly authService: AuthService ) {}

	// ? Endpoints para los alumnos
	@Post( "login" )
	@HttpCode( 200 )
	loginUser( @Body() loginUserDto: LoginUserDto ) {
		console.log( loginUserDto );
		return this.authService.loginUser( loginUserDto );
	}

	@Post( "register" )
	registerUser( @Body() registerUserDto: RegisterUserDto ) {
		return this.authService.registerUser( registerUserDto );
	}

	// ? Endpoints para los administradores
	@Post( "login/admin" )
	@HttpCode( 200 )
	loginAdmin( @Body() loginAdminDto: LoginAdminDto ) {
		return this.authService.loginAdmin( loginAdminDto );
	}

	@Post( "register/admin" )
	registerAdmin( @Body() registerAdminDto: RegisterAdminDto ) {
		return this.authService.registerAdmin( registerAdminDto );
	}

	// ? Metodo para comprobar la vigencia de un Token
	@Get( "check-auth" )
	@UseGuards( AuthGuard )
	checkAuth() {
		return { message: "Autenticación de token correcta" }
	}
}
