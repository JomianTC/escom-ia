import { Repository } from "typeorm";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateComentDto } from "./dto/create-coment.dto";
import { UpdateComentDto } from "./dto/update-coment.dto";
import { User } from "../auth/entities/user.entity";
import { Coment } from "./entities/coment.entity";
export declare class ComentService {
    private comentRepository;
    constructor(comentRepository: Repository<Coment>);
    create(user: User, createComentDto: CreateComentDto): Promise<Coment>;
    findAll(id: string, paginationDto: PaginationDto): Promise<{
        comentsFound: Coment[];
        total: number;
    }>;
    findAllByUser(user: User, paginationDto: PaginationDto): Promise<{
        comentsFound: Coment[];
        total: number;
    }>;
    findOne(id: string): Promise<Coment>;
    update(id: string, updateComentDto: UpdateComentDto): Promise<void>;
    remove(id: string, user: User): Promise<{
        teacherID: string;
        mensaje: string;
    }>;
    trueRemove(id: string): Promise<void>;
}
