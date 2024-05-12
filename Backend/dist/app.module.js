"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const requirement_procedure_module_1 = require("./requirement_procedure/requirement_procedure.module");
const admin_procedure_module_1 = require("./admin_procedure/admin_procedure.module");
const requirements_module_1 = require("./requirements/requirements.module");
const notification_module_1 = require("./notification/notification.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const tag_coment_module_1 = require("./tag_coment/tag_coment.module");
const procedure_module_1 = require("./procedure/procedure.module");
const teacher_module_1 = require("./teacher/teacher.module");
const coment_module_1 = require("./coment/coment.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const tag_module_1 = require("./tag/tag.module");
const gpt_ai_module_1 = require("./gpt-ai/gpt-ai.module");
const mailer_1 = require("@nestjs-modules/mailer");
const status_module_1 = require("./status/status.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.MAILER_SERVICE,
                    auth: {
                        user: process.env.MAILER_EMAIL,
                        pass: process.env.MAILER_SECRET_KEY,
                    },
                },
                template: {
                    dir: (0, path_1.join)(__dirname, ".." + "/templates"),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                }
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            cloudinary_module_1.CloudinaryModule,
            teacher_module_1.TeacherModule,
            coment_module_1.ComentModule,
            tag_module_1.TagModule,
            tag_coment_module_1.TagComentModule,
            procedure_module_1.ProcedureModule,
            requirements_module_1.RequirementsModule,
            requirement_procedure_module_1.RequirementProcedureModule,
            admin_procedure_module_1.AdminProcedureModule,
            notification_module_1.NotificationModule,
            gpt_ai_module_1.GptAiModule,
            status_module_1.StatusModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
console.log(__dirname);
//# sourceMappingURL=app.module.js.map