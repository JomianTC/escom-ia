"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcedureModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const requirement_procedure_service_1 = require("../requirement_procedure/requirement_procedure.service");
const requirement_procedure_module_1 = require("../requirement_procedure/requirement_procedure.module");
const admin_procedure_service_1 = require("../admin_procedure/admin_procedure.service");
const admin_procedure_module_1 = require("../admin_procedure/admin_procedure.module");
const notification_service_1 = require("../notification/notification.service");
const requirements_module_1 = require("../requirements/requirements.module");
const notification_module_1 = require("../notification/notification.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const procedure_controller_1 = require("./procedure.controller");
const procedure_entity_1 = require("./entities/procedure.entity");
const procedure_service_1 = require("./procedure.service");
const user_service_1 = require("../user/user.service");
const auth_module_1 = require("../auth/auth.module");
let ProcedureModule = class ProcedureModule {
};
exports.ProcedureModule = ProcedureModule;
exports.ProcedureModule = ProcedureModule = __decorate([
    (0, common_1.Module)({
        controllers: [procedure_controller_1.ProcedureController],
        providers: [
            procedure_service_1.ProcedureService,
            requirement_procedure_service_1.RequirementProcedureService,
            admin_procedure_service_1.AdminProcedureService,
            user_service_1.UserService,
            notification_service_1.NotificationService
        ],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([procedure_entity_1.Procedure]),
            auth_module_1.AuthModule,
            requirement_procedure_module_1.RequirementProcedureModule,
            requirements_module_1.RequirementsModule,
            admin_procedure_module_1.AdminProcedureModule,
            cloudinary_module_1.CloudinaryModule,
            (0, common_1.forwardRef)(() => notification_module_1.NotificationModule)
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], ProcedureModule);
//# sourceMappingURL=procedure.module.js.map