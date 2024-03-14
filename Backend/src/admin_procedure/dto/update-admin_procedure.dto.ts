import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminProcedureDto } from "./create-admin_procedure.dto";

export class UpdateAdminProcedureDto extends PartialType( CreateAdminProcedureDto ) {}
