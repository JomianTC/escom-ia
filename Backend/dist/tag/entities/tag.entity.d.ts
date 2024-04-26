import { TagComent } from "../../tag_coment/entities/tag_coment.entity";
export declare class Tag {
    id: string;
    nombre: string;
    tagComent: TagComent[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
