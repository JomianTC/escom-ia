import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateGptAiDto {

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
