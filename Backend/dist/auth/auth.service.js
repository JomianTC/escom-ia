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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const bcrypt_adapter_1 = require("../config/bcrypt.adapter");
const admin_entity_1 = require("./entities/admin.entity");
const handle_errors_1 = require("../common/handle-errors");
const user_entity_1 = require("./entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, adminRepository, jwtService) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }
    async loginUser(loginUserDto) {
        const { boleta, contrasena } = loginUserDto;
        try {
            const userFound = await this.userRepository.findOne({
                where: { boleta }
            });
            if (!userFound)
                throw new common_1.BadRequestException({ mensaje: "Usuario no encontrado" });
            if (!bcrypt_adapter_1.BcryptAdapter.compare(contrasena, userFound.contrasena))
                throw new common_1.UnauthorizedException({ mensaje: "Contraseña incorrecta" });
            delete userFound.contrasena;
            return {
                mensaje: "Inicio de sesión exitoso!",
                usuario: userFound,
                token: this.createJWTToken({ email: userFound.email_academico }),
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async registerUser(registerUserDto) {
        const { contrasena, ...userData } = registerUserDto;
        try {
            const userFound = await this.userRepository.findOne({
                where: { boleta: userData.boleta }
            });
            if (userFound)
                throw new common_1.BadRequestException({ mensaje: "Usuario ya registrado" });
            if (!(/^(19|20)/).test(userData.boleta.toString()))
                throw new common_1.BadRequestException({ mensaje: "Boleta no valida" });
            if (!(/^\d{4}(630|631)/).test(userData.boleta.toString()))
                throw new common_1.BadRequestException({ mensaje: "La boleta no es de ESCOM" });
            const user = this.userRepository.create({
                ...userData,
                contrasena: bcrypt_adapter_1.BcryptAdapter.hash(contrasena)
            });
            await this.userRepository.save(user);
            delete user.contrasena;
            return {
                mensaje: "Usuario registrado con exito!",
                usuario: user,
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async loginAdmin(loginAdminDto) {
        const { email, identificador } = loginAdminDto;
        try {
            const adminFound = await this.adminRepository.findOne({
                where: { email: email.toLowerCase() }
            });
            if (!adminFound)
                throw new common_1.BadRequestException({ mensaje: "Administrador no encontrado" });
            if (!bcrypt_adapter_1.BcryptAdapter.compare(identificador, adminFound.identificador))
                throw new common_1.UnauthorizedException({ mensaje: "Identificador incorrecto" });
            delete adminFound.identificador;
            return {
                mensaje: "Inicio de sesión exitoso!",
                admin: adminFound,
                token: this.createJWTToken({ email }),
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async registerAdmin(registerAdminDto) {
        const { identificador, ...adminData } = registerAdminDto;
        try {
            const adminFound = await this.adminRepository.findOne({
                where: { email: adminData.email }
            });
            if (adminFound)
                throw new common_1.BadRequestException({ mensaje: "Administrador ya registrado" });
            const admin = this.adminRepository.create({
                ...adminData,
                identificador: bcrypt_adapter_1.BcryptAdapter.hash(identificador)
            });
            await this.adminRepository.save(admin);
            delete admin.identificador;
            return {
                mensaje: "Administrador registrado con exito!",
                admin,
            };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    createJWTToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.Administrator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map