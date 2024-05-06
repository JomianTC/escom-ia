import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { TeacherService } from "./teacher.service";
import { HandleErrors } from 'src/common/handle-errors';
import { ComentService } from 'src/coment/coment.service';

@Controller( "teacher" )
export class TeacherController {

	constructor( 
		private readonly teacherService: TeacherService,
		private readonly comentService: ComentService
	) { }

	@Post( "" )
	@UseGuards( AuthGuard )
	create( @Body() createTeacherDto: CreateTeacherDto ) {
		return this.teacherService.create( createTeacherDto );
	}

	@Get()
	findAll( @Query() paginationDto: PaginationDto ) {
		return this.teacherService.findAll( paginationDto );
	}

	@Get( ":id" )
	findOne( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.teacherService.findOne( id );
	}

	@Put( ":id" )
	@UseGuards( AuthGuard )
	update( @Param( "id", ParseUUIDPipe ) id: string, @Body() updateTeacherDto: UpdateTeacherDto ) {
		return this.teacherService.update( id, updateTeacherDto );
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	async remove( @Param( "id", ParseUUIDPipe ) id: string ) {

		try {

			const { comentsFound, total } = await this.comentService.findAll( id, { page: 1, limit: 1000 } );

			if ( !comentsFound )
				return this.teacherService.remove( id );

			comentsFound.forEach( async coment => {					
				await this.comentService.trueRemove( coment.id );
			});				
				
			return this.teacherService.remove( id );

		} catch ( error ) { HandleErrors( error ); }
	}

	@Put( "profile-picture/:id" )
	@UseGuards( AuthGuard )
	async updateProfilePicture( @Param( "id", ParseUUIDPipe ) id: string, @Body( "url" ) url: string ) {
		return this.teacherService.updateProfilePicture( id, url );
	}
	
	@Delete( "profile-picture/:id" )
	@UseGuards( AuthGuard )
	async removeProfilePicture( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.teacherService.removeProfilePicture( id );
	}
}
