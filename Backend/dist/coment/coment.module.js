"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const tag_coment_service_1 = require("../tag_coment/tag_coment.service");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const tag_coment_module_1 = require("../tag_coment/tag_coment.module");
const teacher_service_1 = require("../teacher/teacher.service");
const teacher_module_1 = require("../teacher/teacher.module");
const coment_controller_1 = require("./coment.controller");
const user_service_1 = require("../user/user.service");
const coment_entity_1 = require("./entities/coment.entity");
const auth_module_1 = require("../auth/auth.module");
const coment_service_1 = require("./coment.service");
const tag_module_1 = require("../tag/tag.module");
let ComentModule = class ComentModule {
};
exports.ComentModule = ComentModule;
exports.ComentModule = ComentModule = __decorate([
    (0, common_1.Module)({
        controllers: [coment_controller_1.ComentController],
        providers: [coment_service_1.ComentService, user_service_1.UserService, teacher_service_1.TeacherService, tag_coment_service_1.TagComentService],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([coment_entity_1.Coment]),
            auth_module_1.AuthModule,
            cloudinary_module_1.CloudinaryModule,
            (0, common_1.forwardRef)(() => teacher_module_1.TeacherModule),
            tag_module_1.TagModule,
            tag_coment_module_1.TagComentModule
        ],
        exports: [typeorm_1.TypeOrmModule]
    })
], ComentModule);
//# sourceMappingURL=coment.module.js.map