import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

	@IsString()
	@IsEmail()
	email_academico: string; 

	@IsString()
	@MinLength( 1 )
	@MaxLength( 10 )
	boleta: string;
}
