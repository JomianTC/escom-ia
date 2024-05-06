import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { forwardRef, Module } from "@nestjs/common";
import { TagComentService } from "../tag_coment/tag_coment.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { TagComentModule } from "../tag_coment/tag_coment.module";
import { TeacherService } from "../teacher/teacher.service";
import { TeacherModule } from "../teacher/teacher.module";
import { ComentController } from "./coment.controller";
import { UserService } from "../user/user.service";
import { Coment } from "./entities/coment.entity";
import { AuthModule } from "../auth/auth.module";
import { ComentService } from "./coment.service";
import { TagModule } from "../tag/tag.module";

@Module({
	controllers: [ ComentController ],
	providers: [ ComentService, UserService, TeacherService, TagComentService ],
	imports: [ 
		ConfigModule, 
		TypeOrmModule.forFeature([ Coment ]), 
		AuthModule,
		CloudinaryModule,
		
		forwardRef( () => TeacherModule ), 
		
		TagModule,
		TagComentModule
	],
	exports: [ TypeOrmModule ]
})

export class ComentModule { }
