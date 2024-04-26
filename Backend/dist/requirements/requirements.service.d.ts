import { Repository } from "typeorm";
import { CreateRequirementDto } from "./dto/create-requirement.dto";
import { UpdateRequirementDto } from "./dto/update-requirement.dto";
import { Requirement } from "./entities/requirement.entity";
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class RequirementsService {
    private readonly requirementRepository;
    constructor(requirementRepository: Repository<Requirement>);
    create(createRequirementDto: CreateRequirementDto): Promise<{
        mensaje: string;
        requerimiento: Requirement;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        requerimientos: Requirement[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        requirement: Requirement;
    }>;
    findStack(ids: string[]): Promise<Requirement[]>;
    update(id: string, updateRequirementDto: UpdateRequirementDto): Promise<{
        mensaje: string;
    }>;
    remove(id: string): Promise<{
        mensaje: string;
    }>;
}
