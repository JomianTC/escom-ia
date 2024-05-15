import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateGptAiDto {

	@IsString()
	@IsOptional()
	nombre: string;
	
	@IsArray()
	@IsOptional()
	consultas: string[];
	
	@IsString()
	@IsOptional()
	comentario: string;
	
	@IsArray()
	@IsOptional()
	tags: string[];
}
