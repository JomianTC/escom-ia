import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { TeacherService } from "./teacher.service";
import { ComentService } from 'src/coment/coment.service';
export declare class TeacherController {
    private readonly teacherService;
    private readonly comentService;
    constructor(teacherService: TeacherService, comentService: ComentService);
    create(createTeacherDto: CreateTeacherDto): Promise<{
        mensaje: string;
        profesor: import("./entities/teacher.entity").Teacher;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        profesores: import("./entities/teacher.entity").Teacher[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/teacher.entity").Teacher>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<{
        mensaje: string;
        profesor: {
            nombre: string;
            area: string;
            grado_academico: string;
            email: string;
            contacto: string;
            id: string;
            foto_perfil: string;
            calificacion: number;
        } & import("./entities/teacher.entity").Teacher;
    }>;
    remove(id: string): Promise<{
        mensaje: string;
    }>;
    updateProfilePicture(id: string, url: string): Promise<{
        mensaje: string;
        foto_perfil: string;
    }>;
    removeProfilePicture(id: string): Promise<{
        mensaje: string;
    }>;
}
