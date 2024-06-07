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
exports.NotificationService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const webpush = require("web-push");
const notification_entity_1 = require("./entities/notification.entity");
const handle_errors_1 = require("../common/handle-errors");
let NotificationService = class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async create(userID, procedureID, createNotificationDto) {
        const { endpoint, expirationTime, keys } = createNotificationDto;
        try {
            const notificationExists = await this.notificationRepository.findOne({
                where: { procedureID, endpoint: createNotificationDto.endpoint }
            });
            if (notificationExists)
                throw new common_1.BadRequestException({ mensaje: "El dispositivo ya esta registrado" });
            const endpoints = await this.notificationRepository
                .createQueryBuilder("usuarioEndpoint")
                .select("DISTINCT usuarioEndpoint")
                .where("usuarioEndpoint.userID = :userID ", { userID })
                .getRawMany();
            console.log(endpoints);
            if (endpoints.length < 2) {
                const registerNotification = this.notificationRepository.create({
                    userID,
                    procedureID,
                    endpoint,
                    expirationTime,
                    ...keys,
                });
                await this.notificationRepository.save(registerNotification);
                return { mensaje: "Notificaciones activadas correctamente" };
            }
            endpoints.forEach(async (endpoint) => {
                const registerNotification = this.notificationRepository.create({
                    userID,
                    procedureID,
                    endpoint: endpoint.endpoint,
                    expirationTime: endpoint.expirationTime,
                    ...endpoint.keys,
                });
                await this.notificationRepository.save(registerNotification);
            });
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async createCheck(userID, procedureID, createNotificationDto) {
        const { endpoint, expirationTime, keys } = createNotificationDto;
        try {
            const notificationExists = await this.notificationRepository.findOne({
                where: { procedureID, endpoint: createNotificationDto.endpoint }
            });
            if (notificationExists)
                throw new common_1.BadRequestException({ mensaje: "El dispositivo ya esta registrado" });
            const registerNotification = this.notificationRepository.create({
                userID,
                procedureID,
                endpoint,
                expirationTime,
                ...keys,
            });
            await this.notificationRepository.save(registerNotification);
            return { mensaje: "Notificaciones activadas correctamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findNotification(procedureID) {
        try {
            const notifications = await this.notificationRepository.find({
                where: { procedureID }
            });
            return notifications;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async checkNotifications(userID, createNotificationDto) {
        const { endpoint } = createNotificationDto;
        try {
            const endpointExists = await this.notificationRepository.find({
                where: { endpoint }
            });
            if (endpointExists.length > 0)
                return { mensaje: "El dispositivo ya esta registrado" };
            const notificationsFound = await this.notificationRepository.find({
                where: { userID }
            });
            if (notificationsFound.length === 0)
                return { mensaje: "No se encontraron notificaciones registradas" };
            const notificationsAux = new Map();
            notificationsFound.forEach(notification => {
                const notifyKey = `${notification.userID}-${notification.procedureID}`;
                if (!notificationsAux.has(notifyKey))
                    notificationsAux.set(notifyKey, notification);
            });
            const notificationsData = Array.from(notificationsAux.values());
            notificationsData.forEach(async (notification) => {
                await this.createCheck(notification.userID, notification.procedureID, createNotificationDto);
            });
            return { mensaje: "Comprobacion exitosa" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async checkProcedureNotification(userID, procedureID) {
        try {
            const notification = await this.notificationRepository.findOne({
                where: { userID, procedureID }
            });
            if (notification)
                return true;
            return false;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async sendNotification(id, title, message) {
        try {
            const notifications = await this.findNotification(id);
            const notify = notifications.map(async (notification) => {
                const subscription = {
                    endpoint: notification.endpoint,
                    expirationTime: null,
                    keys: {
                        p256dh: notification.p256dh,
                        auth: notification.auth
                    }
                };
                const payload = JSON.stringify({
                    title,
                    message
                });
                webpush.setVapidDetails("mailto:jomiantoca2011@gmail.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
                return await webpush.sendNotification(subscription, payload)
                    .catch(error => {
                    console.log({ message: error.body, fault: error.endpoint });
                    this.removeAll(error.endpoint);
                });
            });
            await Promise.all(notify);
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async sendAllNotification(message) {
        try {
            const notificationsFound = await this.notificationRepository.createQueryBuilder("notification")
                .select("DISTINCT notification.endpoint")
                .execute();
            const notificationsAux = notificationsFound.map(async (notification) => {
                return await this.notificationRepository.findOneBy({ endpoint: notification.endpoint });
            });
            const notifications = await Promise.all(notificationsAux);
            const notify = notifications.map(async (notification) => {
                const subscription = {
                    endpoint: notification.endpoint,
                    expirationTime: null,
                    keys: {
                        p256dh: notification.p256dh,
                        auth: notification.auth
                    }
                };
                const payload = JSON.stringify({
                    title: "Nueva Tramite Disponible",
                    message
                });
                webpush.setVapidDetails("mailto:jomiantoca2011@gmail.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
                return await webpush.sendNotification(subscription, payload)
                    .catch(error => {
                    console.log({ message: error.body, fault: error.endpoint });
                    this.removeAll(error.endpoint);
                });
            });
            await Promise.all(notify);
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(userID, procedureID) {
        try {
            const notification = await this.notificationRepository.findOne({
                where: { userID, procedureID }
            });
            if (!notification)
                throw new common_1.BadRequestException({ mensaje: "No se encontro ninguna subscripcion" });
            await this.notificationRepository.remove(notification);
            return { mensaje: "Subscripcion eliminada correctamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async removeAll(endpoint) {
        try {
            const notification = await this.notificationRepository.find({
                where: { endpoint }
            });
            if (notification.length === 0)
                throw new common_1.BadRequestException({ mensaje: "No se encontraron subscripciones" });
            const deleteNotifications = notification.map(async (notify) => {
                return await this.notificationRepository.remove(notify);
            });
            await Promise.all(deleteNotifications);
            return { mensaje: "Subscripciones eliminadas correctamente" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map