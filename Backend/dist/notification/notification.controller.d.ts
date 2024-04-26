import { CreateNotificationDto } from "./dto/create-notification.dto";
import { ProcedureService } from "../procedure/procedure.service";
import { NotificationService } from "./notification.service";
import { UserService } from "../user/user.service";
export declare class NotificationController {
    private readonly notificationService;
    private readonly userService;
    private readonly procedureService;
    constructor(notificationService: NotificationService, userService: UserService, procedureService: ProcedureService);
    obtainKey(email: string): Promise<{
        mensaje: string;
        llave_publica: string;
    }>;
    checkProcedureNotification(email: string, id: string): Promise<{
        estado: boolean;
    }>;
    create(email: string, id: string, createNotificationDto: CreateNotificationDto): Promise<{
        mensaje: string;
    }>;
    checkNotifications(email: string, createNotificationDto: CreateNotificationDto): Promise<{
        mensaje: string;
    }>;
    delete(email: string, id: string): Promise<{
        mensaje: string;
    }>;
    deleteAll(email: string, createNotificationDto: CreateNotificationDto): Promise<{
        mensaje: string;
    }>;
}
