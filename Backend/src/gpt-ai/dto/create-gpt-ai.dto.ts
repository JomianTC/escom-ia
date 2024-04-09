import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateGptAiDto {

	@IsString()
	@IsOptional()
	consulta: string;
	
	@IsString()
	@IsOptional()
	comentario: string;
	
	@IsArray()
	@IsOptional()
	tags: string[];
}
