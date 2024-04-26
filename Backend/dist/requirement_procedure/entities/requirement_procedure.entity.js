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
exports.RequirementProcedure = void 0;
const typeorm_1 = require("typeorm");
const requirement_entity_1 = require("../../requirements/entities/requirement.entity");
const procedure_entity_1 = require("../../procedure/entities/procedure.entity");
let RequirementProcedure = class RequirementProcedure {
};
exports.RequirementProcedure = RequirementProcedure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RequirementProcedure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => requirement_entity_1.Requirement, requirement => requirement.id, { eager: true }),
    __metadata("design:type", requirement_entity_1.Requirement)
], RequirementProcedure.prototype, "requerimiento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => procedure_entity_1.Procedure, procedure => procedure.id, { onDelete: "CASCADE" }),
    __metadata("design:type", procedure_entity_1.Procedure)
], RequirementProcedure.prototype, "tramite", void 0);
exports.RequirementProcedure = RequirementProcedure = __decorate([
    (0, typeorm_1.Entity)("requirement_procedure")
], RequirementProcedure);
//# sourceMappingURL=requirement_procedure.entity.js.map