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
exports.RequirementsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const requirement_entity_1 = require("./entities/requirement.entity");
const handle_errors_1 = require("../common/handle-errors");
let RequirementsService = class RequirementsService {
    constructor(requirementRepository) {
        this.requirementRepository = requirementRepository;
    }
    async create(createRequirementDto) {
        try {
            const reqFound = await this.requirementRepository.findOneBy({
                nombre: createRequirementDto.nombre.toLowerCase()
            });
            if (reqFound)
                throw new common_1.BadRequestException({ mensaje: "El requerimiento ya existe" });
            const requirement = this.requirementRepository.create(createRequirementDto);
            await this.requirementRepository.save(requirement);
            return {
                mensaje: "Requerimiento creado exitosamente",
                requerimiento: requirement
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const [requirements, total] = await this.requirementRepository.findAndCount({
                take: limit,
                skip: limit * (page - 1)
            });
            return { requerimientos: requirements, total };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findOne(id) {
        try {
            const reqFound = await this.requirementRepository.findOneBy({ id });
            if (!reqFound)
                throw new common_1.BadRequestException({ mensaje: "Requerimiento no registrado" });
            return { requirement: reqFound };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findStack(ids) {
        try {
            const newArrayReq = ids.map(async (id) => {
                const requirement = await this.requirementRepository.findOneBy({ id });
                if (!requirement)
                    throw new common_1.BadRequestException({ mensaje: "El Requerimiento no existe" });
                return requirement;
            });
            const requirements = await Promise.all(newArrayReq);
            return requirements;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async update(id, updateRequirementDto) {
        try {
            await this.findOne(id);
            await this.requirementRepository.update(id, updateRequirementDto);
            return { mensaje: "Requerimiento actualizado exitosamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.requirementRepository.delete(id);
            return { mensaje: "Requerimiento eliminado exitosamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.RequirementsService = RequirementsService;
exports.RequirementsService = RequirementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(requirement_entity_1.Requirement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RequirementsService);
//# sourceMappingURL=requirements.service.js.map