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
exports.TagService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const handle_errors_1 = require("../common/handle-errors");
const tag_entity_1 = require("./entities/tag.entity");
let TagService = class TagService {
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    async create(createTagDto) {
        try {
            const tagFound = await this.tagRepository.findOne({
                where: { nombre: createTagDto.nombre.toLowerCase() }
            });
            if (tagFound)
                throw new common_1.BadRequestException({ mensaje: "El Tag ya existe" });
            const tag = this.tagRepository.create(createTagDto);
            await this.tagRepository.save(tag);
            return { mensaje: "Tag creado correctamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const tags = await this.tagRepository.find({
                skip: (page - 1) * limit,
                take: limit
            });
            const total = await this.tagRepository.count();
            return { tags, total };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findStack(ids) {
        try {
            const newArrayTags = ids.map(async (id) => {
                const tag = await this.tagRepository.findOneBy({ id });
                if (!tag)
                    throw new common_1.BadRequestException({ mensaje: "El Tag no existe" });
                return tag;
            });
            const tags = await Promise.all(newArrayTags);
            return tags;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async update(id, updateTagDto) {
        const { nombre } = updateTagDto;
        try {
            const tagFound = await this.tagRepository.findOneBy({ id });
            if (!tagFound)
                throw new common_1.BadRequestException({ mensaje: "El Tag no existe" });
            if (tagFound.nombre === nombre.toLowerCase())
                throw new common_1.BadRequestException({ mensaje: "El Tag ya existe" });
            const updatedTag = await this.tagRepository.save({
                ...tagFound,
                nombre: nombre.toLowerCase()
            });
            return { mensaje: "Tag actualizado correctamente", tag: updatedTag };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(id) {
        try {
            const tagFound = await this.tagRepository.findOneBy({ id });
            if (!tagFound)
                throw new common_1.BadRequestException({ mensaje: "El Tag no existe" });
            await this.tagRepository.delete({ id });
            return { mensaje: "Tag eliminado correctamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TagService);
//# sourceMappingURL=tag.service.js.map