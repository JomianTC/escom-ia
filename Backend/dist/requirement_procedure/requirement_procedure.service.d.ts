import { Repository } from "typeorm";
import { CreateRequirementProcedureDto } from "./dto/create-requirement_procedure.dto";
import { UpdateRequirementProcedureDto } from "./dto/update-requirement_procedure.dto";
import { RequirementProcedure } from "./entities/requirement_procedure.entity";
import { RequirementsService } from "../requirements/requirements.service";
import { Procedure } from '../procedure/entities/procedure.entity';
export declare class RequirementProcedureService {
    private readonly reqProRepository;
    private readonly reqService;
    constructor(reqProRepository: Repository<RequirementProcedure>, reqService: RequirementsService);
    create(createRequirementProcedureDto: CreateRequirementProcedureDto): Promise<void>;
    findStack(procedure: Procedure): Promise<string[]>;
    update(updateRequirementProcedureDto: UpdateRequirementProcedureDto): Promise<void>;
    remove(procedure: Procedure): Promise<void>;
}
