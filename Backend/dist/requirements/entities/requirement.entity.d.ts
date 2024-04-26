import { RequirementProcedure } from "../../requirement_procedure/entities/requirement_procedure.entity";
export declare class Requirement {
    id: string;
    nombre: string;
    descripcion: string;
    requirement_procedure: RequirementProcedure[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
