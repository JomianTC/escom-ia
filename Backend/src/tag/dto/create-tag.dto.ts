import { IsString, MaxLength } from "class-validator";

export class CreateTagDto {

	@IsString()
	@MaxLength( 35 )
	nombre: string
}
