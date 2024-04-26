import { Repository } from "typeorm";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { Procedure } from "./entities/procedure.entity";
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class ProcedureService {
    private readonly procedureRepository;
    constructor(procedureRepository: Repository<Procedure>);
    findAll(paginationDto: PaginationDto): Promise<{
        procedures: Procedure[];
        total: number;
    }>;
    findOne(id: string): Promise<Procedure>;
    findStack(adminProccedures: string[]): Promise<Procedure[]>;
    create(createProcedureDto: CreateProcedureDto): Promise<Procedure>;
    update(id: string, updateProcedureDto: UpdateProcedureDto): Promise<boolean>;
    updateDate(id: string, updateProcedureDto: UpdateProcedureDto): Promise<{
        mensaje: string;
    }>;
    remove(id: string, estado: boolean): Promise<{
        mensaje: string;
    }>;
}
