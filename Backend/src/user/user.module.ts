import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserService } from "./user.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({

	controllers: [ UserController ],
	providers: [ UserService ],
	imports: [ ConfigModule, AuthModule, CloudinaryModule ]
})

export class UserModule { }
