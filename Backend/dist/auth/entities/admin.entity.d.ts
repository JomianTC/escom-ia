import { AdminProcedure } from "../../admin_procedure/entities/admin_procedure.entity";
export declare class Administrator {
    id: string;
    nombre: string;
    email: string;
    identificador: string;
    area: string;
    foto_perfil: string;
    admin_procedure: AdminProcedure[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
