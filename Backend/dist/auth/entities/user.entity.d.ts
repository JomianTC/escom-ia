import { Coment } from "../../coment/entities/coment.entity";
export declare class User {
    id: string;
    nombres: string;
    apellidos: string;
    boleta: string;
    contrasena: string;
    email_academico: string;
    email_recuperacion: string;
    programa_academico: string;
    foto_perfil: string;
    coments: Coment[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
