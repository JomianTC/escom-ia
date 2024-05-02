import { IsArray, IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateProcedureDto {

	@IsString()
	nombre: string;

	@IsString()
	descripcion: string;

	@IsDateString()
	@IsOptional()
	fechaInicio: Date;

	@IsDateString()
	@IsOptional()
	fechaTermino: Date;
	
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
