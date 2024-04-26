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
exports.AdminProcedure = void 0;
const typeorm_1 = require("typeorm");
const procedure_entity_1 = require("../../procedure/entities/procedure.entity");
const admin_entity_1 = require("../../auth/entities/admin.entity");
let AdminProcedure = class AdminProcedure {
};
exports.AdminProcedure = AdminProcedure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AdminProcedure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Administrator, admin => admin.id, { eager: true }),
    __metadata("design:type", admin_entity_1.Administrator)
], AdminProcedure.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => procedure_entity_1.Procedure, procedure => procedure.id, { eager: true }),
    __metadata("design:type", procedure_entity_1.Procedure)
], AdminProcedure.prototype, "procedure", void 0);
exports.AdminProcedure = AdminProcedure = __decorate([
    (0, typeorm_1.Entity)("admin_tramites")
], AdminProcedure);
//# sourceMappingURL=admin_procedure.entity.js.map