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
exports.RequirementProcedureService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const requirement_procedure_entity_1 = require("./entities/requirement_procedure.entity");
const requirements_service_1 = require("../requirements/requirements.service");
const handle_errors_1 = require("../common/handle-errors");
let RequirementProcedureService = class RequirementProcedureService {
    constructor(reqProRepository, reqService) {
        this.reqProRepository = reqProRepository;
        this.reqService = reqService;
    }
    async create(createRequirementProcedureDto) {
        const { id_requirements, procedure } = createRequirementProcedureDto;
        try {
            const reqsFound = await this.reqService.findStack(id_requirements);
            reqsFound.forEach(async (requerimiento) => {
                const reqPro = this.reqProRepository.create({ requerimiento, tramite: procedure });
                await this.reqProRepository.save(reqPro);
            });
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findStack(procedure) {
        try {
            const reqsProFound = await this.reqProRepository.find({
                where: { tramite: procedure },
            });
            if (reqsProFound.length === 0)
                return ["Sin requerimientos"];
            return reqsProFound.map(requirement => requirement.requerimiento.nombre);
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async update(updateRequirementProcedureDto) {
        const { id_requirements, procedure } = updateRequirementProcedureDto;
        try {
            await Promise.all([
                this.remove(procedure),
                this.create({ id_requirements, procedure }),
            ]);
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(procedure) {
        try {
            const reqsProcedureFound = await this.reqProRepository.find({
                where: { tramite: procedure },
            });
            reqsProcedureFound.forEach(async (reqPro) => {
                await this.reqProRepository.remove(reqPro);
            });
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.RequirementProcedureService = RequirementProcedureService;
exports.RequirementProcedureService = RequirementProcedureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(requirement_procedure_entity_1.RequirementProcedure)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        requirements_service_1.RequirementsService])
], RequirementProcedureService);
//# sourceMappingURL=requirement_procedure.service.js.map