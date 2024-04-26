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
exports.ComentController = void 0;
const common_1 = require("@nestjs/common");
const get_token_payload_decorator_1 = require("../user/decorators/get-token-payload.decorator");
const tag_coment_service_1 = require("../tag_coment/tag_coment.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const teacher_service_1 = require("../teacher/teacher.service");
const create_coment_dto_1 = require("./dto/create-coment.dto");
const update_coment_dto_1 = require("./dto/update-coment.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const user_service_1 = require("../user/user.service");
const coment_service_1 = require("./coment.service");
let ComentController = class ComentController {
    constructor(comentService, userService, teacherService, tagComentService) {
        this.comentService = comentService;
        this.userService = userService;
        this.teacherService = teacherService;
        this.tagComentService = tagComentService;
    }
    async create(email, createComentDto) {
        const user = await this.userService.findByEmail(email);
        await this.teacherService.findOne(createComentDto.id_profesor);
        const coment = await this.comentService.create(user, createComentDto);
        await this.tagComentService.create({ tags_id: createComentDto.tags, coment });
        const { comentsFound, total } = await this.comentService.findAll(createComentDto.id_profesor, { page: 1, limit: 1000 });
        await this.teacherService.updateScore(createComentDto.id_profesor, comentsFound, total);
        return { mensaje: "Comentario creado con éxito" };
    }
    async findOne(id) {
        const coment = await this.comentService.findOne(id);
        const tags = await this.tagComentService.findStack(coment);
        return {
            comentario: {
                puntuacion: coment.puntuacion,
                comentario: coment.comentario,
                fecha: coment.fecha
            },
            usuario: {
                nombres: coment.id_usuario.nombres,
                apellidos: coment.id_usuario.apellidos,
                foto_perfil: coment.id_usuario.foto_perfil
            },
            tags
        };
    }
    async findAllByUser(email, paginationDto) {
        const user = await this.userService.findByEmail(email);
        const { comentsFound, total } = await this.comentService.findAllByUser(user, paginationDto);
        const coments = await Promise.all(comentsFound.map(async (coment) => {
            const tags = await this.tagComentService.findStack(coment);
            return {
                comentario: {
                    id: coment.id,
                    puntuacion: coment.puntuacion,
                    comentario: coment.comentario,
                    fecha: coment.fecha
                },
                usuario: {
                    nombres: coment.id_usuario.nombres,
                    apellidos: coment.id_usuario.apellidos,
                    foto_perfil: coment.id_usuario.foto_perfil
                },
                tags
            };
        }));
        return { comentarios: coments, total };
    }
    async findAllByTeacher(id, paginationDto) {
        await this.teacherService.findOne(id);
        const { comentsFound, total } = await this.comentService.findAll(id, paginationDto);
        const coments = await Promise.all(comentsFound.map(async (coment) => {
            const tags = await this.tagComentService.findStack(coment);
            return {
                comentario: {
                    puntuacion: coment.puntuacion,
                    comentario: coment.comentario,
                    fecha: coment.fecha
                },
                usuario: {
                    nombres: coment.id_usuario.nombres,
                    apellidos: coment.id_usuario.apellidos,
                    foto_perfil: coment.id_usuario.foto_perfil
                },
                tags
            };
        }));
        return { comentarios: coments, total };
    }
    async update(email, id, updateComentDto) {
        await this.userService.findByEmail(email);
        await this.comentService.update(id, updateComentDto);
        const coment = await this.comentService.findOne(id);
        const tags = await this.tagComentService.update({ tags_id: updateComentDto.tags, coment });
        return {
            mensaje: "Comentario actualizado con éxito",
            comentario: {
                puntuacion: coment.puntuacion,
                comentario: coment.comentario,
                fecha: coment.fecha
            },
            usuario: {
                nombres: coment.id_usuario.nombres,
                apellidos: coment.id_usuario.apellidos,
                foto_perfil: coment.id_usuario.foto_perfil
            },
            tags
        };
    }
    async remove(email, id) {
        const user = await this.userService.findByEmail(email);
        const { teacherID, mensaje } = await this.comentService.remove(id, user);
        const { comentsFound, total } = await this.comentService.findAll(teacherID, { page: 1, limit: 1000 });
        await this.teacherService.updateScore(teacherID, comentsFound, total);
        return { mensaje };
    }
};
exports.ComentController = ComentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_coment_dto_1.CreateComentDto]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("user"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)("teacher/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "findAllByTeacher", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_coment_dto_1.UpdateComentDto]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "remove", null);
exports.ComentController = ComentController = __decorate([
    (0, common_1.Controller)("coment"),
    __metadata("design:paramtypes", [coment_service_1.ComentService,
        user_service_1.UserService,
        teacher_service_1.TeacherService,
        tag_coment_service_1.TagComentService])
], ComentController);
//# sourceMappingURL=coment.controller.js.map