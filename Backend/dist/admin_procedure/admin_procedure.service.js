"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProcedureService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const admin_procedure_entity_1 = require("./entities/admin_procedure.entity");
const handle_errors_1 = require("../common/handle-errors");
let AdminProcedureService = class AdminProcedureService {
    constructor(adminProRepository) {
        this.adminProRepository = adminProRepository;
    }
    async create(createAdminProcedureDto) {
        try {
            const adminProcedure = this.adminProRepository.create(createAdminProcedureDto);
            await this.adminProRepository.save(adminProcedure);
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findAll(admin, paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const adminProceduresFound = await this.adminProRepository.find({
                where: { admin },
                take: limit,
                skip: (page - 1) * limit
            });
            if (adminProceduresFound.length === 0)
                throw new common_1.BadRequestException({ mensaje: "No se encontraron trámites" });
            const total = await this.adminProRepository.countBy({ admin });
            const adminProcedures = adminProceduresFound.map(adminProcedure => adminProcedure.procedure.id);
            return { adminProcedures, total };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findOne(admin, procedure) {
        try {
            const adminProcedure = await this.adminProRepository.findOneBy({ procedure, admin });
            if (!adminProcedure)
                throw new common_1.BadRequestException({ mensaje: "No se encontró el permiso" });
            if (adminProcedure.admin.id !== admin.id)
                throw new common_1.BadRequestException({ mensaje: "No tienes permisos para ver este trámite" });
            return adminProcedure.id;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(admin, procedure) {
        try {
            await this.adminProRepository.createQueryBuilder("admin_tramites")
                .where("admin_tramites.adminId = :admin", { admin: admin.id })
                .andWhere("admin_tramites.procedureId = :procedure", { procedure: procedure.id })
                .delete()
                .execute();
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async checkPermission(admin, procedure) {
        try {
            const adminProcedure = await this.adminProRepository.createQueryBuilder("admin_tramites")
                .where("admin_tramites.adminId = :admin", { admin: admin.id })
                .andWhere("admin_tramites.procedureId = :procedure", { procedure: procedure.id })
                .getOne();
            if (adminProcedure)
                return true;
            return false;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.AdminProcedureService = AdminProcedureService;
exports.AdminProcedureService = AdminProcedureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_procedure_entity_1.AdminProcedure)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminProcedureService);
//# sourceMappingURL=admin_procedure.service.js.map