import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { NotificationKeys } from "./entities/notification-key.entity";
import { NotificationController } from "./notification.controller";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { Notification } from "./entities/notification.entity";
import { NotificationService } from "./notification.service";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ NotificationController ],
	providers: [ NotificationService, UserService ],
	imports: [ 

		ConfigModule,

		TypeOrmModule.forFeature([ Notification ]),
		TypeOrmModule.forFeature([ NotificationKeys ]),

		UserModule,
		AuthModule,
		CloudinaryModule,
	],
	exports: [ TypeOrmModule ],
})
export class NotificationModule { }
