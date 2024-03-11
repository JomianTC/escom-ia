import { IsBoolean, IsDateString, IsString } from "class-validator";

export class CreateProcedureDto {

	@IsString()
	nombre: string;

	@IsString()
	descripcion: string;

	@IsDateString()
	fechaInicio: Date;

	@IsDateString()
	fechaTermino: Date;
	
	@IsBoolean()
	estado: boolean;
	
	@IsBoolean()
	esInformativo: boolean;
}
