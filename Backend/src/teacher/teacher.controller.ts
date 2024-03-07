import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, ParseUUIDPipe, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { TeacherService } from "./teacher.service";

@Controller( "teacher" )
export class TeacherController {

	constructor( private readonly teacherService: TeacherService ) { }

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
	remove( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.teacherService.remove( id );
	}

	@Put( "profile-picture/:id" )
	@UseGuards( AuthGuard )
	@UseInterceptors( FileInterceptor( "file" ) )
	async updateProfilePicture( @Param( "id", ParseUUIDPipe ) id: string, @UploadedFile() file: Express.Multer.File ) {
		return this.teacherService.updateProfilePicture( id, file );
	}
	
	@Delete( "profile-picture/:id" )
	@UseGuards( AuthGuard )
	async removeProfilePicture( @Param( "id", ParseUUIDPipe ) id: string ) {
		return this.teacherService.removeProfilePicture( id );
	}
}