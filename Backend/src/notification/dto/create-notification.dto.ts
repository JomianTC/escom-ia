import { IsDefined, IsOptional, IsString } from "class-validator";

export interface Keys {
	p256dh: string;
	auth:   string;
}

export class CreateNotificationDto {

	@IsString()
	endpoint: string;
	
	@IsOptional()
	expirationTime: null;
	
	@IsDefined()
	keys: Keys;
}
