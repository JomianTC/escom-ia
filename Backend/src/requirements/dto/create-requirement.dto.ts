import { IsString } from "class-validator"

export class CreateRequirementDto {

	@IsString()
	nombre: string
	
	@IsString()
	descripcion: string
}
