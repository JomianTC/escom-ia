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
exports.ComentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const handle_errors_1 = require("../common/handle-errors");
const typeorm_2 = require("@nestjs/typeorm");
const coment_entity_1 = require("./entities/coment.entity");
let ComentService = class ComentService {
    constructor(comentRepository) {
        this.comentRepository = comentRepository;
    }
    async create(user, createComentDto) {
        try {
            const coment = this.comentRepository.create({
                ...createComentDto,
                id_usuario: user,
                fecha: new Date()
            });
            await this.comentRepository.save(coment);
            return coment;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findAll(id, paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const comentsFound = await this.comentRepository.find({
                where: { id_profesor: id },
                skip: (page - 1) * limit,
                take: limit
            });
            if (!comentsFound)
                throw new common_1.BadRequestException({ mensaje: "No hay comentarios" });
            const total = await this.comentRepository.createQueryBuilder("coment")
                .where("coment.id_profesor = :id", { id })
                .getCount();
            return { comentsFound, total };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findAllByUser(user, paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const comentsFound = await this.comentRepository.find({
                where: { id_usuario: user },
                skip: (page - 1) * limit,
                take: limit
            });
            if (!comentsFound)
                throw new common_1.BadRequestException({ mensaje: "No hay comentarios" });
            const total = await this.comentRepository.createQueryBuilder("coment")
                .where("coment.id_usuario = :id", { id: user.id })
                .getCount();
            return { comentsFound, total };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findOne(id) {
        try {
            const comentFound = await this.comentRepository.findOneBy({ id });
            if (!comentFound)
                throw new common_1.BadRequestException({ mensaje: "El comentario no existe" });
            return comentFound;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async update(id, updateComentDto) {
        const { id_profesor = "", tags, ...comentData } = updateComentDto;
        try {
            const comentFound = await this.comentRepository.findOneBy({ id });
            if (!comentFound)
                throw new common_1.NotFoundException({ mensaje: "El comentario no existe" });
            await this.comentRepository.update(id, { ...comentData, fecha: new Date() });
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(id, user) {
        try {
            const comentFound = await this.comentRepository.findOneBy({ id });
            if (!comentFound)
                throw new common_1.NotFoundException({ mensaje: "El comentario no existe" });
            if (comentFound.id_usuario.id !== user.id)
                throw new common_1.BadRequestException({ mensaje: "No tienes permiso para eliminar este comentario" });
            await this.comentRepository.delete(id);
            return {
                teacherID: comentFound.id_profesor,
                mensaje: "Comentario eliminado con éxito"
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async trueRemove(id) {
        try {
            const comentFound = await this.comentRepository.findOneBy({ id });
            if (!comentFound)
                throw new common_1.NotFoundException({ mensaje: "El comentario no existe" });
            await this.comentRepository.delete(id);
            return;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.ComentService = ComentService;
exports.ComentService = ComentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(coment_entity_1.Coment)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ComentService);
//# sourceMappingURL=coment.service.js.map