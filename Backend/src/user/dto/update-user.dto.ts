import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

	@IsString()
	@MinLength( 1 )
	@IsOptional()
	nombres: string;

	@IsString()
	@MinLength( 1 )
	@IsOptional()
	apellidos: string;
	
	@IsString()
	@IsEmail()
	@IsOptional()
	email_academico: string; 
	
	@IsString()
	@IsEmail()
	@IsOptional()
	email_recuperacion: string;
	
	@IsString()
	@IsIn([	"ISC-2009", "ISC-2020", "IA-2020", "LCD-2020", "ISISA", "MCSCM" ])
	@IsOptional()
	programa_academico: string;
}
