import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TagComent } from "./entities/tag_coment.entity";
import { TagComentService } from "./tag_coment.service";
import { TagService } from "../tag/tag.service";
import { TagModule } from "../tag/tag.module";

@Module({
	providers: [ TagComentService, TagService ],
	imports: [ ConfigModule, TypeOrmModule.forFeature([ TagComent ]), TagModule ],
	exports: [ TypeOrmModule ]
})

export class TagComentModule { }
