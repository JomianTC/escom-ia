import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { ProcedureController } from "./procedure.controller";
import { Procedure } from "./entities/procedure.entity";
import { ProcedureService } from "./procedure.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ ProcedureController ],
	providers: [ ProcedureService ],
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([ Procedure ]),
		AuthModule,
	],
	exports: [ TypeOrmModule ],
})

export class ProcedureModule { }
