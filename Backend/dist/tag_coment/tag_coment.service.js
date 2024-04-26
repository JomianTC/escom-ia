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
exports.TagComentService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const tag_coment_entity_1 = require("./entities/tag_coment.entity");
const handle_errors_1 = require("../common/handle-errors");
const tag_service_1 = require("../tag/tag.service");
let TagComentService = class TagComentService {
    constructor(tagComentRepository, tagService) {
        this.tagComentRepository = tagComentRepository;
        this.tagService = tagService;
    }
    async create(createTagComentDto) {
        const { tags_id, coment } = createTagComentDto;
        try {
            const tagsFound = await this.tagService.findStack(tags_id);
            tagsFound.forEach(async (tag) => {
                const tagComent = this.tagComentRepository.create({ tag, coment });
                await this.tagComentRepository.save(tagComent);
            });
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findStack(coment) {
        try {
            const tagsComentFound = await this.tagComentRepository.find({
                where: { coment },
            });
            if (tagsComentFound.length === 0)
                return ["Sin tags"];
            return tagsComentFound.map(tag => tag.tag.nombre);
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async update(updateTagComentDto) {
        const { tags_id, coment } = updateTagComentDto;
        try {
            await Promise.all([
                this.remove(coment),
                this.create({ tags_id, coment }),
            ]);
            return await this.findStack(coment);
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(coment) {
        try {
            const tagsComentFound = await this.tagComentRepository.find({
                where: { coment },
            });
            tagsComentFound.forEach(async (tagComent) => {
                await this.tagComentRepository.remove(tagComent);
            });
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.TagComentService = TagComentService;
exports.TagComentService = TagComentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_coment_entity_1.TagComent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tag_service_1.TagService])
], TagComentService);
//# sourceMappingURL=tag_coment.service.js.map