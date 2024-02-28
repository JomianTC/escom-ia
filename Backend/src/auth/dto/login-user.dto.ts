import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

	@IsString()
	@MinLength( 1 )
	@MaxLength( 10 )
	boleta: string;

	@IsString()
	@MinLength( 8 )
	contrasena: string;
}
