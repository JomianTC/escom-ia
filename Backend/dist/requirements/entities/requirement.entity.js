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
exports.Requirement = void 0;
const requirement_procedure_entity_1 = require("../../requirement_procedure/entities/requirement_procedure.entity");
const typeorm_1 = require("typeorm");
let Requirement = class Requirement {
    checkFieldsBeforeInsert() {
        this.nombre = this.nombre.toLowerCase();
    }
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
};
exports.Requirement = Requirement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Requirement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Requirement.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Requirement.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => requirement_procedure_entity_1.RequirementProcedure, requirement_procedure => requirement_procedure.id),
    __metadata("design:type", Array)
], Requirement.prototype, "requirement_procedure", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Requirement.prototype, "checkFieldsBeforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Requirement.prototype, "checkFieldsBeforeUpdate", null);
exports.Requirement = Requirement = __decorate([
    (0, typeorm_1.Entity)("Requirement")
], Requirement);
//# sourceMappingURL=requirement.entity.js.map