import { Procedure } from "../../procedure/entities/procedure.entity";
import { Administrator } from "../../auth/entities/admin.entity";
export declare class AdminProcedure {
    id: string;
    admin: Administrator;
    procedure: Procedure;
}
