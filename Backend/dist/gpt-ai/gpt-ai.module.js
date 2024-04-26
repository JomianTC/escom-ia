"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptAiModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const requirement_procedure_module_1 = require("../requirement_procedure/requirement_procedure.module");
const requirement_procedure_service_1 = require("../requirement_procedure/requirement_procedure.service");
const requirements_module_1 = require("../requirements/requirements.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const procedure_service_1 = require("../procedure/procedure.service");
const procedure_module_1 = require("../procedure/procedure.module");
const gpt_ai_controller_1 = require("./gpt-ai.controller");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const gpt_ai_service_1 = require("./gpt-ai.service");
let GptAiModule = class GptAiModule {
};
exports.GptAiModule = GptAiModule;
exports.GptAiModule = GptAiModule = __decorate([
    (0, common_1.Module)({
        controllers: [gpt_ai_controller_1.GptAiController],
        providers: [
            gpt_ai_service_1.GptAiService,
            auth_service_1.AuthService,
            user_service_1.UserService,
            procedure_service_1.ProcedureService,
            requirement_procedure_service_1.RequirementProcedureService
        ],
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            cloudinary_module_1.CloudinaryModule,
            procedure_module_1.ProcedureModule,
            requirement_procedure_module_1.RequirementProcedureModule,
            requirements_module_1.RequirementsModule,
            typeorm_1.TypeOrmModule,
            config_1.ConfigModule
        ],
    })
], GptAiModule);
//# sourceMappingURL=gpt-ai.module.js.map