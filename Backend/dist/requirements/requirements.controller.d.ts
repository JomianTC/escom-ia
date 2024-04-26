import { RequirementsService } from "./requirements.service";
import { CreateRequirementDto } from "./dto/create-requirement.dto";
import { UpdateRequirementDto } from "./dto/update-requirement.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
export declare class RequirementsController {
    private readonly requirementsService;
    constructor(requirementsService: RequirementsService);
    create(createRequirementDto: CreateRequirementDto): Promise<{
        mensaje: string;
        requerimiento: import("./entities/requirement.entity").Requirement;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        requerimientos: import("./entities/requirement.entity").Requirement[];
        total: number;
    }>;
    update(id: string, updateRequirementDto: UpdateRequirementDto): Promise<{
        mensaje: string;
    }>;
    remove(id: string): Promise<{
        mensaje: string;
    }>;
}
