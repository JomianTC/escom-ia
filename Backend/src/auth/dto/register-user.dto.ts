import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

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
	@IsEmail()
	email_academico: string; 
	
	@IsString()
	@IsEmail()
	email_recuperacion: string;
	
	@IsString()
	programa_academico: string;
}
