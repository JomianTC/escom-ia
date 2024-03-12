import { PartialType } from "@nestjs/mapped-types";
import { CreateRequirementProcedureDto } from "./create-requirement_procedure.dto";

export class UpdateRequirementProcedureDto extends PartialType( CreateRequirementProcedureDto ) {}
