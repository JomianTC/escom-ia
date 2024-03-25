import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { forwardRef, Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { ProcedureService } from "../procedure/procedure.service";
import { ProcedureModule } from "../procedure/procedure.module";
import { Notification } from "./entities/notification.entity";
import { NotificationService } from "./notification.service";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ NotificationController ],
	providers: [ NotificationService, UserService, ProcedureService ],
	imports: [ 

		ConfigModule,

		TypeOrmModule.forFeature([ Notification ]),

		UserModule,
		AuthModule,
		forwardRef( () => ProcedureModule ),
		CloudinaryModule,
	],
	exports: [ TypeOrmModule ],
})
export class NotificationModule { }
