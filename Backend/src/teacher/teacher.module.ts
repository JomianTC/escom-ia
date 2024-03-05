import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { TeacherController } from "./teacher.controller";
import { Teacher } from "./entities/teacher.entity";
import { TeacherService } from "./teacher.service";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	controllers: [ TeacherController ],
	providers: [ TeacherService ],
	imports: [ 
		ConfigModule, 

		TypeOrmModule.forFeature([ Teacher ]),
		
		CloudinaryModule,
		AuthModule
	],
	exports: [ TypeOrmModule ]
})

export class TeacherModule { }
