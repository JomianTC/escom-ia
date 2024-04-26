"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const requirements_controller_1 = require("./requirements.controller");
const requirements_service_1 = require("./requirements.service");
const requirement_entity_1 = require("./entities/requirement.entity");
const auth_module_1 = require("../auth/auth.module");
let RequirementsModule = class RequirementsModule {
};
exports.RequirementsModule = RequirementsModule;
exports.RequirementsModule = RequirementsModule = __decorate([
    (0, common_1.Module)({
        controllers: [requirements_controller_1.RequirementsController],
        providers: [requirements_service_1.RequirementsService],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([requirement_entity_1.Requirement]),
            auth_module_1.AuthModule
        ],
        exports: [requirements_service_1.RequirementsService, typeorm_1.TypeOrmModule]
    })
], RequirementsModule);
//# sourceMappingURL=requirements.module.js.map