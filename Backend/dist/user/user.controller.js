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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const get_token_payload_decorator_1 = require("./decorators/get-token-payload.decorator");
const auth_guard_1 = require("../auth/guards/auth.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findByEmail(email) {
        return this.userService.findByEmail(email);
    }
    async resetPassword(email_recuperacion) {
        return this.userService.resetPassword(email_recuperacion);
    }
    async newPassword(email_recuperacion, contrasena) {
        return this.userService.newPassword(email_recuperacion, contrasena);
    }
    async updateUser(email, updateUserDto) {
        return this.userService.updateUserInfo(email, updateUserDto);
    }
    async update(email, file) {
        return this.userService.updateProfilePicture(email, file);
    }
    async remove(email) {
        return this.userService.removeProfilePicture(email);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Post)("reset/password"),
    __param(0, (0, common_1.Body)("email_recuperacion")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)("new/password"),
    __param(0, (0, common_1.Body)("email_recuperacion")),
    __param(1, (0, common_1.Body)("contrasena")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "newPassword", null);
__decorate([
    (0, common_1.Put)("update"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)("update/profile-picture"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/profile-picture"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map