import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RequirementsController } from "./requirements.controller";
import { RequirementsService } from "./requirements.service";
import { Requirement } from "./entities/requirement.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ RequirementsController ],
	providers: [ RequirementsService ],
	imports: [ 
		ConfigModule, 
		TypeOrmModule.forFeature([ Requirement ]),
		AuthModule
	]
})
export class RequirementsModule { }
