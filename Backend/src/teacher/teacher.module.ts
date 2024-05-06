import { ConfigModule } from "@nestjs/config";
import { forwardRef, Module } from "@nestjs/common";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { TeacherController } from "./teacher.controller";
import { Teacher } from "./entities/teacher.entity";
import { TeacherService } from "./teacher.service";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagComentService } from "src/tag_coment/tag_coment.service";
import { ComentService } from "src/coment/coment.service";
import { TagComentModule } from "src/tag_coment/tag_coment.module";
import { ComentModule } from "src/coment/coment.module";
import { TagModule } from "src/tag/tag.module";

@Module({
	controllers: [ TeacherController ],
	providers: [ TeacherService, TagComentService, ComentService ],
	imports: [ 
		ConfigModule, 

		TypeOrmModule.forFeature([ Teacher ]),
		
		CloudinaryModule,
		AuthModule,

		TagComentModule,
		TagModule,
		forwardRef( () => ComentModule )
	],
	exports: [ TypeOrmModule ]
})

export class TeacherModule { }
