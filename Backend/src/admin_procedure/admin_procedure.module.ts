import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AdminProcedure } from "./entities/admin_procedure.entity";
import { AdminProcedureService } from "./admin_procedure.service";

@Module({
	providers: [ AdminProcedureService ],
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([ AdminProcedure ]),
	],
	exports: [ TypeOrmModule ]
})
export class AdminProcedureModule { }
