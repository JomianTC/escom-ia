import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { UserController } from "./user.controller";
import { AuthModule } from "../auth/auth.module";
import { UserService } from "./user.service";

@Module({

	controllers: [ UserController ],
	providers: [ UserService ],
	imports: [ ConfigModule, AuthModule, CloudinaryModule ]
})

export class UserModule { }
