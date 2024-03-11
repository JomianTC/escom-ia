import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseUUIDPipe, Query, Put } from "@nestjs/common";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ProcedureService } from "./procedure.service";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller( "procedure" )
export class ProcedureController {

	constructor( private readonly procedureService: ProcedureService ){}

	// ? Metodos Alumno

	@Get()
	findAll( @Query() paginationDto: PaginationDto ){
		return this.procedureService.findAll( paginationDto );
	}

	// TODO: findOne -- Tabla requerimientos_tramite

	// ? Metodos Admin

	@Post()
	@UseGuards( AuthGuard )
	create( @Body() createProcedureDto: CreateProcedureDto ) {
		return this.procedureService.create( createProcedureDto );
	}

	// TODO: FindAllWithPermissions  -- Tabla admin_tramites AKA Permisos
	// TODO: FindOneWithPermissions  -- Tabla admin_tramites AKA Permisos

	@Put( ":id" )
	@UseGuards( AuthGuard )
	update( 
		@Param( "id", ParseUUIDPipe ) id: string,
		@Body() updateProcedureDto: UpdateProcedureDto
	){
		return this.procedureService.update( id, updateProcedureDto );
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	remove( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.procedureService.remove( id );
	}
}
