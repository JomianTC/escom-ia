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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const admin_entity_1 = require("../auth/entities/admin.entity");
const bcrypt_adapter_1 = require("../config/bcrypt.adapter");
const handle_errors_1 = require("../common/handle-errors");
const user_entity_1 = require("../auth/entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, adminRepository, cloudinaryService, mailerService) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.cloudinaryService = cloudinaryService;
        this.mailerService = mailerService;
    }
    async findByEmail(email) {
        try {
            const userFound = await this.userRepository.findOne({
                where: { email_academico: email.toLowerCase() }
            });
            if (!userFound)
                throw new common_1.BadRequestException({ mensaje: "Usuario no encontrado" });
            return userFound;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findByEmailUserAdmin(email) {
        try {
            const userFound = await this.userRepository.findOne({
                where: { email_academico: email.toLowerCase() }
            });
            const adminFound = await this.adminRepository.findOne({
                where: { email: email.toLowerCase() }
            });
            if (!userFound && !adminFound)
                throw new common_1.BadRequestException({ mensaje: "Usuario o Administrador no encontrado" });
            return;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async resetPassword(email_recuperacion) {
        try {
            const userFound = await this.userRepository.findOne({
                where: { email_recuperacion }
            });
            if (!userFound)
                throw new common_1.BadRequestException({ mensaje: "Email de recuperacion no registrado" });
            await this.mailerService.sendMail({
                to: email_recuperacion,
                from: {
                    name: "No Reply",
                    address: `${process.env.MAILER_EMAIL}`,
                },
                subject: "Restablecimiento de contraseña",
                template: "email-template",
            });
            return { mensaje: "Correo de recuperación enviado correctamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async newPassword(email_recuperacion, contrasena) {
        try {
            const userFound = await this.userRepository.findOne({
                where: { email_recuperacion }
            });
            if (!userFound)
                throw new common_1.BadRequestException({ mensaje: "Usuario no encontrado" });
            await this.userRepository.update(userFound.id, { contrasena: bcrypt_adapter_1.BcryptAdapter.hash(contrasena) });
            return { mensaje: "Contraseña actualizada correctamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findByEmailAdmin(email) {
        try {
            const adminFound = await this.adminRepository.findOne({
                where: { email: email.toLowerCase() }
            });
            if (!adminFound)
                throw new common_1.BadRequestException({ mensaje: "Administrador no encontrado" });
            return adminFound;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async updateProfilePicture(email, file) {
        try {
            const userFound = await this.userRepository.findOne({
                where: { email_academico: email }
            });
            if (!userFound)
                throw new common_1.BadRequestException({ mensaje: "Usuario no encontrado" });
            await this.deletePicture(userFound.id);
            if (!file)
                throw new common_1.BadRequestException({ mensaje: "No se subio ningun archivo" });
            const fileExtension = file.mimetype.split("/")[1];
            const validExtensions = ["jpg", "png", "jpeg", "gif"];
            if (!validExtensions.includes(fileExtension))
                throw new common_1.BadRequestException({ mensaje: "Tipo de archivo no permitido" });
            if (file.size > 2097152)
                throw new common_1.BadRequestException({ mensaje: "El archivo es mayor a 2MB" });
            file.originalname = userFound.id;
            const { secure_url } = await this.cloudinaryService.uploadImage(file);
            if (!secure_url)
                throw new common_1.BadRequestException("Error subiendo la imagen");
            await this.userRepository.update(userFound.id, { foto_perfil: secure_url });
            return {
                mensaje: "Foto recibida correctamente",
                foto_perfil: secure_url
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async updateUserInfo(email, updateUserDto) {
        const { email_academico = "", email_recuperacion = "" } = updateUserDto;
        try {
            const userFound = await this.findByEmail(email);
            const userFoundEmailAcademico = await this.userRepository.findOne({
                where: { email_academico }
            });
            if (userFoundEmailAcademico)
                throw new common_1.BadRequestException({ mensaje: "Email academico ya registrado" });
            const userFoundEmailRecuperacion = await this.userRepository.findOne({
                where: { email_recuperacion }
            });
            if (userFoundEmailRecuperacion)
                throw new common_1.BadRequestException({ mensaje: "Email de recuperacion ya registrado" });
            await this.userRepository.update(userFound.id, updateUserDto);
            return {
                mensaje: "Información actualizada correctamente"
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async removeProfilePicture(email) {
        try {
            const userFound = await this.userRepository.findOne({
                where: { email_academico: email }
            });
            if (!userFound)
                throw new common_1.BadRequestException({ mensaje: "Usuario no encontrado" });
            await this.userRepository.update(userFound.id, { foto_perfil: "" });
            await this.deletePicture(userFound.id);
            return {
                mensaje: "Foto eliminada correctamente"
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async deletePicture(fileName) {
        await this.cloudinaryService.deleteImage(fileName);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.Administrator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService,
        mailer_1.MailerService])
], UserService);
//# sourceMappingURL=user.service.js.map