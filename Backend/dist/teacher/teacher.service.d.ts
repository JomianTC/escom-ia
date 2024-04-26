import { Repository } from "typeorm";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teacher } from "./entities/teacher.entity";
import { Coment } from "src/coment/entities/coment.entity";
export declare class TeacherService {
    private readonly teacherRepository;
    constructor(teacherRepository: Repository<Teacher>);
    create(createTeacherDto: CreateTeacherDto): Promise<{
        mensaje: string;
        profesor: Teacher;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        profesores: Teacher[];
        total: number;
    }>;
    findOne(id: string): Promise<Teacher>;
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
        } & Teacher;
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
    updateScore(teacherID: string, coments: Coment[], total: number): Promise<void>;
}
