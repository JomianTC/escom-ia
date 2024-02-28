import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginAdminDto {

	@IsString()
	@IsEmail()
	email: string; 

	@IsString()
	@MinLength( 1 )
	@MaxLength( 10 )
	identificador: string;
}
