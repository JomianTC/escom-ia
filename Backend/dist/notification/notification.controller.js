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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const get_token_payload_decorator_1 = require("../user/decorators/get-token-payload.decorator");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const procedure_service_1 = require("../procedure/procedure.service");
const notification_service_1 = require("./notification.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const user_service_1 = require("../user/user.service");
let NotificationController = class NotificationController {
    constructor(notificationService, userService, procedureService) {
        this.notificationService = notificationService;
        this.userService = userService;
        this.procedureService = procedureService;
    }
    async obtainKey(email) {
        await this.userService.findByEmail(email);
        return {
            mensaje: "Llave enviada correctamente",
            llave_publica: process.env.VAPID_PUBLIC_KEY
        };
    }
    async checkProcedureNotification(email, id) {
        const user = await this.userService.findByEmail(email);
        await this.procedureService.findOne(id);
        const isActivated = await this.notificationService.checkProcedureNotification(user.id, id);
        return { estado: isActivated };
    }
    async create(email, id, createNotificationDto) {
        const user = await this.userService.findByEmail(email);
        await this.procedureService.findOne(id);
        await this.notificationService.create(user.id, id, createNotificationDto);
        return { mensaje: "Suscripcion creada correctamente" };
    }
    async checkNotifications(email, createNotificationDto) {
        const user = await this.userService.findByEmail(email);
        return await this.notificationService.checkNotifications(user.id, createNotificationDto);
    }
    async delete(email, id) {
        const user = await this.userService.findByEmail(email);
        await this.procedureService.findOne(id);
        return await this.notificationService.remove(user.id, id);
    }
    async deleteAll(email, createNotificationDto) {
        await this.userService.findByEmail(email);
        return await this.notificationService.removeAll(createNotificationDto.endpoint);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)("key"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "obtainKey", null);
__decorate([
    (0, common_1.Get)("subscription/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "checkProcedureNotification", null);
__decorate([
    (0, common_1.Post)("subscription/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("checkDevice"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "checkNotifications", null);
__decorate([
    (0, common_1.Delete)("subscription/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)("subscription/delete/all"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteAll", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)("notification"),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        user_service_1.UserService,
        procedure_service_1.ProcedureService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map