import { TagComentService } from '../tag_coment/tag_coment.service';
import { PaginationDto } from "../common/dto/pagination.dto";
import { TeacherService } from "../teacher/teacher.service";
import { CreateComentDto } from "./dto/create-coment.dto";
import { UpdateComentDto } from "./dto/update-coment.dto";
import { UserService } from "../user/user.service";
import { ComentService } from "./coment.service";
export declare class ComentController {
    private readonly comentService;
    private readonly userService;
    private readonly teacherService;
    private readonly tagComentService;
    constructor(comentService: ComentService, userService: UserService, teacherService: TeacherService, tagComentService: TagComentService);
    create(email: string, createComentDto: CreateComentDto): Promise<{
        mensaje: string;
    }>;
    findOne(id: string): Promise<{
        comentario: {
            puntuacion: number;
            comentario: string;
            fecha: Date;
        };
        usuario: {
            nombres: string;
            apellidos: string;
            foto_perfil: string;
        };
        tags: string[];
    }>;
    findAllByUser(email: string, paginationDto: PaginationDto): Promise<{
        comentarios: {
            comentario: {
                id: string;
                puntuacion: number;
                comentario: string;
                fecha: Date;
            };
            usuario: {
                nombres: string;
                apellidos: string;
                foto_perfil: string;
            };
            tags: string[];
        }[];
        total: number;
    }>;
    findAllByTeacher(id: string, paginationDto: PaginationDto): Promise<{
        comentarios: {
            comentario: {
                puntuacion: number;
                comentario: string;
                fecha: Date;
            };
            usuario: {
                nombres: string;
                apellidos: string;
                foto_perfil: string;
            };
            tags: string[];
        }[];
        total: number;
    }>;
    update(email: string, id: string, updateComentDto: UpdateComentDto): Promise<{
        mensaje: string;
        comentario: {
            puntuacion: number;
            comentario: string;
            fecha: Date;
        };
        usuario: {
            nombres: string;
            apellidos: string;
            foto_perfil: string;
        };
        tags: string[];
    }>;
    remove(email: string, id: string): Promise<{
        mensaje: string;
    }>;
}
