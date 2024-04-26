import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { AdminProcedureService } from "../admin_procedure/admin_procedure.service";
import { NotificationService } from "../notification/notification.service";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ProcedureService } from "./procedure.service";
import { UserService } from '../user/user.service';
export declare class ProcedureController {
    private readonly procedureService;
    private readonly reqProService;
    private readonly userService;
    private readonly adminProService;
    private readonly notificationService;
    private nonNewProcedures;
    constructor(procedureService: ProcedureService, reqProService: RequirementProcedureService, userService: UserService, adminProService: AdminProcedureService, notificationService: NotificationService);
    findAll(paginationDto: PaginationDto): Promise<{
        tramites: {
            links: string[];
            id: string;
            nombre: string;
            descripcion: string;
            fechaInicio: Date;
            fechaTermino: Date;
            estado: boolean;
            esInformativo: boolean;
            requirement_procedure: import("../requirement_procedure/entities/requirement_procedure.entity").RequirementProcedure[];
            admin_procedure: import("../admin_procedure/entities/admin_procedure.entity").AdminProcedure[];
        }[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        links: string[];
        requerimientos: string[];
        id: string;
        nombre: string;
        descripcion: string;
        fechaInicio: Date;
        fechaTermino: Date;
        estado: boolean;
        esInformativo: boolean;
        requirement_procedure: import("../requirement_procedure/entities/requirement_procedure.entity").RequirementProcedure[];
        admin_procedure: import("../admin_procedure/entities/admin_procedure.entity").AdminProcedure[];
    }>;
    create(email: string, createProcedureDto: CreateProcedureDto): Promise<{
        mensaje: string;
    }>;
    findAllWithPermissions(email: string, paginationDto: PaginationDto): Promise<{
        tramites: {
            tramite: {
                links: string[];
                id: string;
                nombre: string;
                descripcion: string;
                fechaInicio: Date;
                fechaTermino: Date;
                estado: boolean;
                esInformativo: boolean;
                requirement_procedure: import("../requirement_procedure/entities/requirement_procedure.entity").RequirementProcedure[];
                admin_procedure: import("../admin_procedure/entities/admin_procedure.entity").AdminProcedure[];
            };
            requerimientos: string[];
        }[];
        total: number;
    }>;
    findOneWithPermissions(email: string, id: string): Promise<{
        links: string[];
        requerimientos: string[];
        id: string;
        nombre: string;
        descripcion: string;
        fechaInicio: Date;
        fechaTermino: Date;
        estado: boolean;
        esInformativo: boolean;
        requirement_procedure: import("../requirement_procedure/entities/requirement_procedure.entity").RequirementProcedure[];
        admin_procedure: import("../admin_procedure/entities/admin_procedure.entity").AdminProcedure[];
    }>;
    givePermissions(email: string, id: string, newAdminEmail: string): Promise<{
        mensaje: string;
    }>;
    revokePermissions(email: string, id: string, deleteAdminEmail: string): Promise<{
        mensaje: string;
    }>;
    update(id: string, updateProcedureDto: UpdateProcedureDto): Promise<{
        mensaje: string;
    }>;
    remove(id: string, estado: boolean): Promise<{
        mensaje: string;
    }>;
    checkPermission(email: string, id: string): Promise<{
        admin: import("../auth/entities/admin.entity").Administrator;
        procedure: import("./entities/procedure.entity").Procedure;
        adminProcedureId: string;
    }>;
    create24HTimer(): Promise<void>;
    obtainNonNewProcedures(): Promise<void>;
}
