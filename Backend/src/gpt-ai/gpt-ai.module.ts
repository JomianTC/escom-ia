import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RequirementProcedureModule } from "../requirement_procedure/requirement_procedure.module";
import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { RequirementsModule } from "../requirements/requirements.module";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { ProcedureService } from "../procedure/procedure.service";
import { ProcedureModule } from "../procedure/procedure.module";
import { GptAiController } from "./gpt-ai.controller";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { GptAiService } from "./gpt-ai.service";

@Module({
	controllers: [ GptAiController ],
	providers: [ 
		GptAiService, 
		AuthService, 
		UserService, 
		ProcedureService, 
		RequirementProcedureService
	],
	imports: [ 
		AuthModule, 
		UserModule, 
		CloudinaryModule, 
		ProcedureModule, 
		RequirementProcedureModule,
		RequirementsModule, 
		TypeOrmModule, 
		ConfigModule
	],
})

export class GptAiModule { }
