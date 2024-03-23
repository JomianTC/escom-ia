import { IsEmail, IsIn, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {

	@IsString()
	@MinLength( 1 )
	nombres: string;

	@IsString()
	@MinLength( 1 )
	apellidos: string;
	
	@IsString()
	@MinLength( 1 )
	@MaxLength( 10 )
	boleta: string;
	
	@IsString()
	@MinLength( 8 )
	contrasena: string;
	
	@IsString()
	@IsEmail()
	email_academico: string; 
	
	@IsString()
	@IsEmail()
	email_recuperacion: string;
	
	@IsString()
	@IsIn([	"ISC-2009", "ISC-2020", "IA-2020", "LCD-2020", "ISISA", "MCSCM" ])
	programa_academico: string;
}
