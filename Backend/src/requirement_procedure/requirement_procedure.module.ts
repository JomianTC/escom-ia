import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RequirementProcedure } from "./entities/requirement_procedure.entity";
import { RequirementProcedureService } from "./requirement_procedure.service";
import { RequirementsService } from "../requirements/requirements.service";
import { RequirementsModule } from "../requirements/requirements.module";

@Module({
	providers: [ RequirementProcedureService, RequirementsService ],
	imports: [ ConfigModule, TypeOrmModule.forFeature([ RequirementProcedure ]), RequirementsModule ],
	exports: [ TypeOrmModule ],
})
export class RequirementProcedureModule { }
