export interface Keys {
    p256dh: string;
    auth: string;
}
export declare class CreateNotificationDto {
    endpoint: string;
    expirationTime: null;
    keys: Keys;
}
