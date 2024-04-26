import { Procedure } from "../../procedure/entities/procedure.entity";
import { Administrator } from "../../auth/entities/admin.entity";
export declare class CreateAdminProcedureDto {
    admin: Administrator;
    procedure: Procedure;
}
