import { IsArray } from "class-validator";
import { Procedure } from "../../procedure/entities/procedure.entity";

export class CreateRequirementProcedureDto {

	@IsArray()
	id_requirements: string[];

	procedure: Procedure;
}
