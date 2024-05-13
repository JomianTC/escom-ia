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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAdminDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterAdminDto {
}
exports.RegisterAdminDto = RegisterAdminDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "identificador", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsIn)([
        "Dirección",
        "Consejo Técnico Consultivo Escolar",
        "Decanato",
        "Comité Interno de Proyectos",
        "Coordinación de Enlace y Gestión Técnica",
        "Unidad de Informática",
        "Subdirección Académica",
        "Departamento de Formación Básica",
        "Departamento de Ciencias e Ingeniería de la Computación",
        "Departamento de Ingeniería en Sistemas Computacionales",
        "Departamento de Fórmacion Integral e Institucional",
        "Departamento de Evaluación y Seguimiento Académico",
        "departamento de Innovación Educativa",
        "Unidad de Tecnología Educativa y Campus Virtual",
        "Sección de Estudios de Posgrado e Investigación",
        "Colegio de Profesores",
        "Departamento de Posgrado",
        "Departamento de Investigación",
        "Subdirección de Servicios Educativos e Integración Social",
        "Departamento de Gestión Escolar",
        "Departamento de Servicos Estudiantiles",
        "Departamento de Extensión y Apoyos Educativos",
        "Unidad Politécnica de Integración Social",
        "Subdirección Administrativa",
        "Departamento de Capital Humano",
        "Departamento de Recursos  Financieros",
        "Departamento de Recursos Materiales y Servicios"
    ]),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "area", void 0);
//# sourceMappingURL=register-admin.dto.js.map