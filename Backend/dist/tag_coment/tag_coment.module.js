"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagComentModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const tag_coment_entity_1 = require("./entities/tag_coment.entity");
const tag_coment_service_1 = require("./tag_coment.service");
const tag_service_1 = require("../tag/tag.service");
const tag_module_1 = require("../tag/tag.module");
let TagComentModule = class TagComentModule {
};
exports.TagComentModule = TagComentModule;
exports.TagComentModule = TagComentModule = __decorate([
    (0, common_1.Module)({
        providers: [tag_coment_service_1.TagComentService, tag_service_1.TagService],
        imports: [config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([tag_coment_entity_1.TagComent]), tag_module_1.TagModule],
        exports: [typeorm_1.TypeOrmModule]
    })
], TagComentModule);
//# sourceMappingURL=tag_coment.module.js.map