"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementProcedureModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const requirement_procedure_entity_1 = require("./entities/requirement_procedure.entity");
const requirement_procedure_service_1 = require("./requirement_procedure.service");
const requirements_service_1 = require("../requirements/requirements.service");
const requirements_module_1 = require("../requirements/requirements.module");
let RequirementProcedureModule = class RequirementProcedureModule {
};
exports.RequirementProcedureModule = RequirementProcedureModule;
exports.RequirementProcedureModule = RequirementProcedureModule = __decorate([
    (0, common_1.Module)({
        providers: [requirement_procedure_service_1.RequirementProcedureService, requirements_service_1.RequirementsService],
        imports: [config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([requirement_procedure_entity_1.RequirementProcedure]), requirements_module_1.RequirementsModule],
        exports: [typeorm_1.TypeOrmModule],
    })
], RequirementProcedureModule);
//# sourceMappingURL=requirement_procedure.module.js.map