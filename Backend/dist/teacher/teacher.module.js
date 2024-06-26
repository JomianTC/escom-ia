"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const teacher_controller_1 = require("./teacher.controller");
const teacher_entity_1 = require("./entities/teacher.entity");
const teacher_service_1 = require("./teacher.service");
const auth_module_1 = require("../auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const tag_coment_service_1 = require("../tag_coment/tag_coment.service");
const coment_service_1 = require("../coment/coment.service");
const tag_coment_module_1 = require("../tag_coment/tag_coment.module");
const coment_module_1 = require("../coment/coment.module");
const tag_module_1 = require("../tag/tag.module");
let TeacherModule = class TeacherModule {
};
exports.TeacherModule = TeacherModule;
exports.TeacherModule = TeacherModule = __decorate([
    (0, common_1.Module)({
        controllers: [teacher_controller_1.TeacherController],
        providers: [teacher_service_1.TeacherService, tag_coment_service_1.TagComentService, coment_service_1.ComentService],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([teacher_entity_1.Teacher]),
            cloudinary_module_1.CloudinaryModule,
            auth_module_1.AuthModule,
            tag_coment_module_1.TagComentModule,
            tag_module_1.TagModule,
            (0, common_1.forwardRef)(() => coment_module_1.ComentModule)
        ],
        exports: [typeorm_1.TypeOrmModule]
    })
], TeacherModule);
//# sourceMappingURL=teacher.module.js.map