import { Repository } from "typeorm";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification } from "./entities/notification.entity";
export declare class NotificationService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    create(userID: string, procedureID: string, createNotificationDto: CreateNotificationDto): Promise<{
        mensaje: string;
    }>;
    findNotification(procedureID: string): Promise<Notification[]>;
    checkNotifications(userID: string, createNotificationDto: CreateNotificationDto): Promise<{
        mensaje: string;
    }>;
    checkProcedureNotification(userID: string, procedureID: string): Promise<boolean>;
    sendNotification(id: string, title: string, message: string): Promise<void>;
    sendAllNotification(message: string): Promise<void>;
    remove(userID: string, procedureID: string): Promise<{
        mensaje: string;
    }>;
    removeAll(endpoint: string): Promise<{
        mensaje: string;
    }>;
}
