import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseUUIDPipe, Query, Put } from "@nestjs/common";
import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ProcedureService } from "./procedure.service";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller( "procedure" )
export class ProcedureController {

	constructor( 
		private readonly procedureService: ProcedureService,
		private readonly reqProService: RequirementProcedureService,
	){}

	// ? Metodos Alumno

	@Get()
	async findAll( @Query() paginationDto: PaginationDto ){

		return this.procedureService.findAll( paginationDto );

		// const { procedures, total } = await this.procedureService.findAll( paginationDto );

		// const fullProcedures = await Promise.all( procedures.map( async ( procedure ) => {

		// 	const requirements = await this.reqProService.findStack( procedure );
		// 	return { tramite: procedure, requerimientos: requirements };
		// }));

		// return { tramites: fullProcedures, total };
	}

	@Get( ":id" )
	async findOne( @Param( "id", ParseUUIDPipe ) id: string ){

		const procedure = await this.procedureService.findOne( id );
		const requirements = await this.reqProService.findStack( procedure );

		return {
			procedure,
			requirements
		}
	}

	// ? Metodos Admin

	@Post()
	@UseGuards( AuthGuard )
	async create( @Body() createProcedureDto: CreateProcedureDto ) {

		const procedure = await this.procedureService.create( createProcedureDto );		
		await this.reqProService.create({ 
			id_requirements: createProcedureDto.requerimentos,
			procedure
		});

		return { message: "Trámite creado correctamente" }
	}

	// TODO: FindAllWithPermissions  -- Tabla admin_tramites AKA Permisos
	// TODO: FindOneWithPermissions  -- Tabla admin_tramites AKA Permisos

	@Put( ":id" )
	@UseGuards( AuthGuard )
	async update( 
		@Param( "id", ParseUUIDPipe ) id: string,
		@Body() updateProcedureDto: UpdateProcedureDto
	){
		
		await this.procedureService.update( id, updateProcedureDto );

		const procedure = await this.procedureService.findOne( id );
		await this.reqProService.update({ id_requirements: updateProcedureDto.requerimentos, procedure });
		
		return { message: "Trámite actualizado correctamente" };
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	remove( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.procedureService.remove( id );
	}
}
