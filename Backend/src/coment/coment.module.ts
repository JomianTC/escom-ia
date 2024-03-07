import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { TeacherService } from "../teacher/teacher.service";
import { TeacherModule } from "../teacher/teacher.module";
import { ComentController } from "./coment.controller";
import { UserService } from "../user/user.service";
import { Coment } from "./entities/coment.entity";
import { AuthModule } from "../auth/auth.module";
import { ComentService } from "./coment.service";

@Module({
	controllers: [ ComentController ],
	providers: [ ComentService, UserService, TeacherService ],
	imports: [ ConfigModule, TypeOrmModule.forFeature([ Coment ]), AuthModule, CloudinaryModule, TeacherModule ]
})

export class ComentModule { }
