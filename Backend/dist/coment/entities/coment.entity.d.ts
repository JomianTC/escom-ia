import { User } from "../../auth/entities/user.entity";
import { TagComent } from "../../tag_coment/entities/tag_coment.entity";
export declare class Coment {
    id: string;
    id_profesor: string;
    puntuacion: number;
    comentario: string;
    fecha: Date;
    id_usuario: User;
    tagComent: TagComent[];
}
