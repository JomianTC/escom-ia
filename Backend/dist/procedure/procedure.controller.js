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
exports.ProcedureController = void 0;
const common_1 = require("@nestjs/common");
const requirement_procedure_service_1 = require("../requirement_procedure/requirement_procedure.service");
const admin_procedure_service_1 = require("../admin_procedure/admin_procedure.service");
const get_token_payload_decorator_1 = require("../user/decorators/get-token-payload.decorator");
const notification_service_1 = require("../notification/notification.service");
const create_procedure_dto_1 = require("./dto/create-procedure.dto");
const update_procedure_dto_1 = require("./dto/update-procedure.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const procedure_service_1 = require("./procedure.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const user_service_1 = require("../user/user.service");
let ProcedureController = class ProcedureController {
    constructor(procedureService, reqProService, userService, adminProService, notificationService) {
        this.procedureService = procedureService;
        this.reqProService = reqProService;
        this.userService = userService;
        this.adminProService = adminProService;
        this.notificationService = notificationService;
        this.nonNewProcedures = [];
        this.create24HTimer();
        this.obtainNonNewProcedures();
    }
    async findAll(paginationDto) {
        const { procedures, total } = await this.procedureService.findAll(paginationDto);
        const tramites = procedures.map(async (procedure) => {
            const { links, ...procedureData } = procedure;
            const enlaces = links.split("-----");
            enlaces.pop();
            const requirements = await this.reqProService.findStack(procedure);
            return { tramite: { ...procedureData, links: enlaces }, requerimientos: requirements };
        });
        return { tramites: await Promise.all(tramites), total };
    }
    async findOne(id) {
        const procedure = await this.procedureService.findOne(id);
        const requirements = await this.reqProService.findStack(procedure);
        const { links, ...procedureData } = procedure;
        const enlaces = links.split("-----");
        enlaces.pop();
        return {
            ...procedureData,
            links: enlaces,
            requerimientos: requirements,
        };
    }
    async create(email, createProcedureDto) {
        const procedure = await this.procedureService.create(createProcedureDto);
        await this.reqProService.create({
            id_requirements: createProcedureDto.requerimentos,
            procedure
        });
        const admin = await this.userService.findByEmailAdmin(email);
        await this.adminProService.create({ admin, procedure });
        return { mensaje: "Trámite creado correctamente" };
    }
    async findAllWithPermissions(email, paginationDto) {
        const admin = await this.userService.findByEmailAdmin(email);
        const { adminProcedures, total } = await this.adminProService.findAll(admin, paginationDto);
        const adminProceduresFound = await this.procedureService.findStack(adminProcedures);
        const fullProcedures = await Promise.all(adminProceduresFound.map(async (procedure) => {
            const { links, ...procedureData } = procedure;
            const enlaces = links.split("-----");
            enlaces.pop();
            const requirements = await this.reqProService.findStack(procedure);
            return { tramite: { ...procedureData, links: enlaces }, requerimientos: requirements };
        }));
        return { tramites: fullProcedures, total };
    }
    async findOneWithPermissions(email, id) {
        const { procedure } = await this.checkPermission(email, id);
        const requirements = await this.reqProService.findStack(procedure);
        const { links, ...procedureData } = procedure;
        const enlaces = links.split("-----");
        enlaces.pop();
        return {
            ...procedureData,
            links: enlaces,
            requerimientos: requirements,
        };
    }
    async givePermissions(email, id, newAdminEmail) {
        const { procedure } = await this.checkPermission(email, id);
        const adminToGive = await this.userService.findByEmailAdmin(newAdminEmail);
        const adminAlreadyHasPermission = await this.adminProService.checkPermission(adminToGive, procedure);
        if (adminAlreadyHasPermission)
            throw new common_1.BadRequestException({ message: "El administrador ya tiene permisos" });
        await this.adminProService.create({ admin: adminToGive, procedure });
        return { mensaje: "Permisos otorgados correctamente" };
    }
    async revokePermissions(email, id, deleteAdminEmail) {
        await this.checkPermission(email, id);
        const admin = await this.userService.findByEmailAdmin(deleteAdminEmail);
        const procedure = await this.procedureService.findOne(id);
        const adminDosntHavePermission = await this.adminProService.checkPermission(admin, procedure);
        if (!adminDosntHavePermission)
            throw new common_1.BadRequestException({ message: "El administrador nunca tuvo permisos" });
        await this.adminProService.remove(admin, procedure);
        return { mensaje: "Permisos revocados correctamente" };
    }
    async update(id, updateProcedureDto) {
        const estado = await this.procedureService.update(id, updateProcedureDto);
        const { mensaje, nombre } = await this.procedureService.updateDate(id, updateProcedureDto);
        if (estado && mensaje === "X")
            await this.notificationService.sendNotification(id, "Actualizacion", `El tramite ${nombre} ha sido modificado`);
        if (estado && mensaje !== "X")
            await this.notificationService.sendNotification(id, "Modificacion de Fechas", mensaje);
        const procedure = await this.procedureService.findOne(id);
        await this.reqProService.update({ id_requirements: updateProcedureDto.requerimentos, procedure });
        return { mensaje: "Trámite actualizado correctamente" };
    }
    async remove(id) {
        const procedure = await this.procedureService.findOne(id);
        const { mensaje } = await this.procedureService.remove(id, !procedure.estado);
        if (!this.nonNewProcedures.includes(id)) {
            await this.notificationService.sendAllNotification(`El tramite ${procedure.nombre} ahora esta disponible`);
            this.nonNewProcedures.push(id);
            console.log("Tramites actualizados");
            console.log(this.nonNewProcedures);
        }
        if (!procedure.estado)
            await this.notificationService.sendNotification(id, "Activacion de Tramite", `El tramite: ${procedure.nombre} esta activo`);
        else
            await this.notificationService.sendNotification(id, "Activacion de Tramite", `El tramite: ${procedure.nombre} esta inactivo`);
        return { mensaje };
    }
    async checkPermission(email, id) {
        const admin = await this.userService.findByEmailAdmin(email);
        const procedure = await this.procedureService.findOne(id);
        const adminProcedureId = await this.adminProService.findOne(admin, procedure);
        return { admin, procedure, adminProcedureId };
    }
    async create24HTimer() {
        const todayAtNine = new Date();
        todayAtNine.setHours(9);
        todayAtNine.setMinutes(0);
        todayAtNine.setSeconds(0);
        todayAtNine.setMilliseconds(0);
        let tiempoRestante = todayAtNine.getTime() - Date.now();
        if (tiempoRestante < 0)
            tiempoRestante += 24 * 60 * 60 * 1000;
        setTimeout(async () => {
            try {
                const { procedures } = await this.procedureService.findAll({ limit: 1000, page: 1 });
                procedures.forEach(async (procedure) => {
                    const today = `${todayAtNine.getDate()}-${todayAtNine.getMonth()}`;
                    const procedureDay = `${procedure.fechaTermino.getDate()}-${procedure.fechaTermino.getMonth()}`;
                    if (today !== procedureDay)
                        return;
                    if (!procedure.estado)
                        return;
                    await this.notificationService
                        .sendNotification(procedure.id, "AVISO", `El tramite: ${procedure.nombre} termina HOY!!!`);
                });
                console.log("Notificaciones enviadas 9AM");
            }
            catch (error) {
                console.log(`${error.message} que terminen el dia de hoy`);
            }
        }, tiempoRestante);
    }
    async obtainNonNewProcedures() {
        try {
            const { procedures } = await this.procedureService.findAll({ limit: 1000, page: 1 });
            procedures.forEach(procedure => { this.nonNewProcedures.push(procedure.id); });
            console.log(this.nonNewProcedures);
        }
        catch (error) { }
    }
};
exports.ProcedureController = ProcedureController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_procedure_dto_1.CreateProcedureDto]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("admin/findAll"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "findAllWithPermissions", null);
__decorate([
    (0, common_1.Get)("admin/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "findOneWithPermissions", null);
__decorate([
    (0, common_1.Post)("admin/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "givePermissions", null);
__decorate([
    (0, common_1.Delete)("admin/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "revokePermissions", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_procedure_dto_1.UpdateProcedureDto]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcedureController.prototype, "remove", null);
exports.ProcedureController = ProcedureController = __decorate([
    (0, common_1.Controller)("procedure"),
    __metadata("design:paramtypes", [procedure_service_1.ProcedureService,
        requirement_procedure_service_1.RequirementProcedureService,
        user_service_1.UserService,
        admin_procedure_service_1.AdminProcedureService,
        notification_service_1.NotificationService])
], ProcedureController);
//# sourceMappingURL=procedure.controller.js.map