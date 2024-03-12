import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { RequirementProcedureModule } from "../requirement_procedure/requirement_procedure.module";
import { RequirementsModule } from "../requirements/requirements.module";
import { ProcedureController } from "./procedure.controller";
import { Procedure } from "./entities/procedure.entity";
import { ProcedureService } from "./procedure.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ ProcedureController ],
	providers: [ ProcedureService, RequirementProcedureService ],
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([ Procedure ]),
		AuthModule,
		RequirementProcedureModule,
		RequirementsModule
	],
	exports: [ TypeOrmModule ],
})

export class ProcedureModule { }
