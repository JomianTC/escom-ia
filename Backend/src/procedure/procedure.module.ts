import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { RequirementProcedureModule } from "../requirement_procedure/requirement_procedure.module";
import { AdminProcedureService } from "../admin_procedure/admin_procedure.service";
import { AdminProcedureModule } from "../admin_procedure/admin_procedure.module";
import { RequirementsModule } from "../requirements/requirements.module";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { ProcedureController } from "./procedure.controller";
import { Procedure } from "./entities/procedure.entity";
import { ProcedureService } from "./procedure.service";
import { UserService } from "../user/user.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ ProcedureController ],
	providers: [ 
		ProcedureService, 
		RequirementProcedureService, 
		AdminProcedureService, 
		UserService
	],
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([ Procedure ]),
		AuthModule,
		RequirementProcedureModule,
		RequirementsModule,
		AdminProcedureModule,
		CloudinaryModule
	],
	exports: [ TypeOrmModule ],
})

export class ProcedureModule { }
