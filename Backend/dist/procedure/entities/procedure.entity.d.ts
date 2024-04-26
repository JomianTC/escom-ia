import { AdminProcedure } from "../../admin_procedure/entities/admin_procedure.entity";
import { RequirementProcedure } from "../../requirement_procedure/entities/requirement_procedure.entity";
export declare class Procedure {
    id: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaTermino: Date;
    estado: boolean;
    esInformativo: boolean;
    links: string;
    requirement_procedure: RequirementProcedure[];
    admin_procedure: AdminProcedure[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
