import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateTeacherDto {

	@IsString()
	@MinLength( 3 )
	nombre: string;

	@IsString()
	area: string;

	@IsString()
	grado_academico: string;
	
	@IsString()
	@IsEmail()
	email: string;
	
	@IsString()
	@MinLength( 10 )
	contacto: string;
}
