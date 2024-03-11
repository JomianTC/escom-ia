import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, ParseUUIDPipe } from "@nestjs/common";
import { RequirementsService } from "./requirements.service";
import { CreateRequirementDto } from "./dto/create-requirement.dto";
import { UpdateRequirementDto } from "./dto/update-requirement.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller( "requirements" )
export class RequirementsController {

	constructor( private readonly requirementsService: RequirementsService ){}

	@Post()
	@UseGuards( AuthGuard )
	create( @Body() createRequirementDto: CreateRequirementDto ) {
		return this.requirementsService.create( createRequirementDto );
	}

	@Get()
	findAll( @Query() paginationDto: PaginationDto ) {
		return this.requirementsService.findAll( paginationDto );
	}

	@Put( ":id" )
	@UseGuards( AuthGuard )
	update( 
		@Param("id", ParseUUIDPipe ) id: string,
		@Body() updateRequirementDto: UpdateRequirementDto
	){
		return this.requirementsService.update( id, updateRequirementDto );
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	remove( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.requirementsService.remove( id );
	}
}
