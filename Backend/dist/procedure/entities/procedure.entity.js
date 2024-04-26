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
exports.Procedure = void 0;
const admin_procedure_entity_1 = require("../../admin_procedure/entities/admin_procedure.entity");
const requirement_procedure_entity_1 = require("../../requirement_procedure/entities/requirement_procedure.entity");
const typeorm_1 = require("typeorm");
let Procedure = class Procedure {
    checkFieldsBeforeInsert() {
        this.nombre = this.nombre.toLowerCase();
    }
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
};
exports.Procedure = Procedure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Procedure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Procedure.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Procedure.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Procedure.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Procedure.prototype, "fechaTermino", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Procedure.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Procedure.prototype, "esInformativo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Procedure.prototype, "links", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => requirement_procedure_entity_1.RequirementProcedure, requirement_procedure => requirement_procedure.id, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Procedure.prototype, "requirement_procedure", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => admin_procedure_entity_1.AdminProcedure, admin_procedure => admin_procedure.id, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Procedure.prototype, "admin_procedure", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Procedure.prototype, "checkFieldsBeforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Procedure.prototype, "checkFieldsBeforeUpdate", null);
exports.Procedure = Procedure = __decorate([
    (0, typeorm_1.Entity)("Tramite")
], Procedure);
//# sourceMappingURL=procedure.entity.js.map