import { Controller, Get, Post, Body, Param, Delete, Query, Put, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { TagService } from "./tag.service";

@Controller( "tag" )
export class TagController {
	
	constructor( private readonly tagService: TagService ) { }

	@Post()
	@UseGuards( AuthGuard )
	create( @Body() createTagDto: CreateTagDto ) {
		return this.tagService.create( createTagDto );
	}

	@Get()
	findAll( @Query() paginationDto: PaginationDto ) {
		return this.tagService.findAll( paginationDto );
	}

	@Put( ":id" )
	@UseGuards( AuthGuard )
	update( @Param( "id", ParseUUIDPipe ) id: string, @Body() updateTagDto: UpdateTagDto ) {
		return this.tagService.update( id, updateTagDto );
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	remove( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.tagService.remove( id );
	}
}
