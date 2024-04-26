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
exports.TeacherService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const handle_errors_1 = require("../common/handle-errors");
const teacher_entity_1 = require("./entities/teacher.entity");
let TeacherService = class TeacherService {
    constructor(teacherRepository) {
        this.teacherRepository = teacherRepository;
    }
    async create(createTeacherDto) {
        const { email, contacto } = createTeacherDto;
        try {
            const teacherFound = await this.teacherRepository.find({
                where: [{ email }, { contacto }]
            });
            if (teacherFound) {
                teacherFound.forEach(teacher => {
                    if (teacher.email === email)
                        throw new common_1.BadRequestException({ mensaje: "El email ya está registrado" });
                    if (teacher.contacto === contacto)
                        throw new common_1.BadRequestException({ mensaje: "El contacto ya está registrado" });
                });
            }
            const newTeacher = this.teacherRepository.create(createTeacherDto);
            await this.teacherRepository.save(newTeacher);
            return {
                mensaje: "Profesor registrado exitosamente",
                profesor: newTeacher
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const teachersFound = await this.teacherRepository.find({
                skip: (page - 1) * limit,
                take: limit
            });
            if (!teachersFound)
                throw new common_1.BadRequestException({ mensaje: "No hay profesores registrados" });
            const totalTeachers = await this.teacherRepository.count();
            return {
                profesores: teachersFound,
                total: totalTeachers
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findOne(id) {
        try {
            const teacherFound = await this.teacherRepository.findOneBy({ id });
            if (!teacherFound)
                throw new common_1.BadRequestException({ mensaje: "Profesor no registrado" });
            return teacherFound;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async update(id, updateTeacherDto) {
        const { email = "", contacto = "" } = updateTeacherDto;
        try {
            const teacherFound = await this.teacherRepository.findOneBy({ id });
            if (!teacherFound)
                throw new common_1.BadRequestException({ mensaje: "Profesor no registrado" });
            const teacherByUniques = await this.teacherRepository.find({
                where: [{ email }, { contacto }]
            });
            if (teacherByUniques) {
                teacherByUniques.forEach(teacher => {
                    if (teacher.id === teacherFound.id)
                        return;
                    if (teacher.email === email)
                        throw new common_1.BadRequestException({ mensaje: "El email ya está registrado" });
                    if (teacher.contacto === contacto)
                        throw new common_1.BadRequestException({ mensaje: "El contacto ya está registrado" });
                });
            }
            const newTeacher = await this.teacherRepository.save({
                ...teacherFound,
                ...updateTeacherDto
            });
            return {
                mensaje: "Profesor actualizado exitosamente",
                profesor: newTeacher
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(id) {
        try {
            const teacherFound = await this.teacherRepository.findOneBy({ id });
            if (!teacherFound)
                throw new common_1.BadRequestException({ mensaje: "Profesor no registrado" });
            await this.teacherRepository.delete({ id });
            return { mensaje: "Profesor eliminado exitosamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async updateProfilePicture(id, url) {
        try {
            const teacherFound = await this.teacherRepository.findOneBy({ id });
            if (!teacherFound)
                throw new common_1.BadRequestException({ mensaje: "Profesor no registrado" });
            await this.teacherRepository.update(teacherFound.id, { foto_perfil: url });
            return {
                mensaje: "Foto recibida correctamente",
                foto_perfil: url
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async removeProfilePicture(id) {
        try {
            const teacherFound = await this.teacherRepository.findOneBy({ id });
            if (!teacherFound)
                throw new common_1.BadRequestException({ mensaje: "Profesor no registrado" });
            await this.teacherRepository.update(teacherFound.id, { foto_perfil: "" });
            return {
                mensaje: "Foto eliminada correctamente"
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async updateScore(teacherID, coments, total) {
        try {
            const teacherFound = await this.findOne(teacherID);
            let score = 0;
            coments.forEach(coment => score += coment.puntuacion);
            score = score / total;
            if (score > 5)
                throw new common_1.InternalServerErrorException({ mensaje: "Error al actualizar la puntuacion" });
            await this.teacherRepository.update(teacherFound.id, { calificacion: score });
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map