import { Repository } from "typeorm";
import { CreateAdminProcedureDto } from "./dto/create-admin_procedure.dto";
import { AdminProcedure } from './entities/admin_procedure.entity';
import { Procedure } from "../procedure/entities/procedure.entity";
import { Administrator } from "../auth/entities/admin.entity";
import { PaginationDto } from "../common/dto/pagination.dto";
export declare class AdminProcedureService {
    private readonly adminProRepository;
    constructor(adminProRepository: Repository<AdminProcedure>);
    create(createAdminProcedureDto: CreateAdminProcedureDto): Promise<void>;
    findAll(admin: Administrator, paginationDto: PaginationDto): Promise<{
        adminProcedures: string[];
        total: number;
    }>;
    findOne(admin: Administrator, procedure: Procedure): Promise<string>;
    remove(admin: Administrator, procedure: Procedure): Promise<void>;
    checkPermission(admin: Administrator, procedure: Procedure): Promise<boolean>;
}
