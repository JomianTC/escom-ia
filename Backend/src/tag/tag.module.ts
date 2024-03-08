import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { AuthModule } from "../auth/auth.module";
import { Tag } from "./entities/tag.entity";
import { TagService } from "./tag.service";

@Module({
	controllers: [ TagController ],
	providers: [ TagService ],
	imports: [ ConfigModule, TypeOrmModule.forFeature([ Tag ]), AuthModule ],
	exports: [ TypeOrmModule, TagService ]	
})

export class TagModule { }
