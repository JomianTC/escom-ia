import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterAdminDto {

	@IsString()
	@MinLength( 1 )
	@MaxLength( 10 )
	identificador: string;

	@IsString()
	@MinLength( 1 )
	nombre: string;

	@IsString()
	@IsEmail()
	email: string; 
	
	@IsString()
	@MinLength( 1 )
	area: string;
}
