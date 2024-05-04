import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateProcedureDto {

	@IsString()
	nombre: string;

	@IsString()
	descripcion: string;
	
	@IsString()
	@IsOptional()
	fechaInicio: string;
	
	@IsString()
	@IsOptional()
	fechaTermino: string;
	
	@IsBoolean()
	@IsOptional()
	esInformativo: boolean;
	
	@IsBoolean()
	@IsOptional()
	estado: boolean;

	@IsArray()
	@IsOptional()
	links: string[];
	
	@IsArray()
	requerimentos: string[];
}
