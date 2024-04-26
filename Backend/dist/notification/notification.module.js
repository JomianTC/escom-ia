"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const notification_controller_1 = require("./notification.controller");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const procedure_service_1 = require("../procedure/procedure.service");
const procedure_module_1 = require("../procedure/procedure.module");
const notification_entity_1 = require("./entities/notification.entity");
const notification_service_1 = require("./notification.service");
const user_service_1 = require("../user/user.service");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService, user_service_1.UserService, procedure_service_1.ProcedureService],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification]),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            (0, common_1.forwardRef)(() => procedure_module_1.ProcedureModule),
            cloudinary_module_1.CloudinaryModule,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map