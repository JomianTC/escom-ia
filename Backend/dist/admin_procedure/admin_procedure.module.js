"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProcedureModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const admin_procedure_entity_1 = require("./entities/admin_procedure.entity");
const admin_procedure_service_1 = require("./admin_procedure.service");
let AdminProcedureModule = class AdminProcedureModule {
};
exports.AdminProcedureModule = AdminProcedureModule;
exports.AdminProcedureModule = AdminProcedureModule = __decorate([
    (0, common_1.Module)({
        providers: [admin_procedure_service_1.AdminProcedureService],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([admin_procedure_entity_1.AdminProcedure]),
        ],
        exports: [typeorm_1.TypeOrmModule]
    })
], AdminProcedureModule);
//# sourceMappingURL=admin_procedure.module.js.map