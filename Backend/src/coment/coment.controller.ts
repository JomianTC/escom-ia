import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, ParseUUIDPipe, Put, HttpStatus, HttpCode } from "@nestjs/common";
import { GetTokenPayload } from "../user/decorators/get-token-payload.decorator";
import { TagComentService } from '../tag_coment/tag_coment.service';
import { PaginationDto } from "../common/dto/pagination.dto";
import { TeacherService } from "../teacher/teacher.service";
import { CreateComentDto } from "./dto/create-coment.dto";
import { UpdateComentDto } from "./dto/update-coment.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UserService } from "../user/user.service";
import { ComentService } from "./coment.service";

@Controller( "coment" )
export class ComentController {

	constructor( 
		private readonly comentService: ComentService,
		private readonly userService: UserService,
		private readonly teacherService: TeacherService,
		private readonly tagComentService: TagComentService,
	){}

	@Post()
	@UseGuards( AuthGuard )
	async create( @GetTokenPayload() email: string, @Body() createComentDto: CreateComentDto ) {
		
		const user = await this.userService.findByEmail( email );
		await this.teacherService.findOne( createComentDto.id_profesor );
		
		const coment = await this.comentService.create( user, createComentDto );
		await this.tagComentService.create({ tags_id: createComentDto.tags, coment });

		const { comentsFound, total } = await this.comentService.findAll( createComentDto.id_profesor, { page: 1, limit: 1000 } );
		await this.teacherService.updateScore( createComentDto.id_profesor, comentsFound, total );

		return { message: "Comentario creado con éxito" };
	}

	@Get( ":id" )
	async findOne( @Param( "id", ParseUUIDPipe ) id: string ) {

		const coment = await this.comentService.findOne( id );
		const tags = await this.tagComentService.findStack( coment );

		return {
			comentario: {
				puntuacion: coment.puntuacion,
				comentario: coment.comentario,
				fecha: coment.fecha
			},
			usuario: {
				nombres: coment.id_usuario.nombres,
				apellidos: coment.id_usuario.apellidos,
				foto_perfil: coment.id_usuario.foto_perfil
			},
			tags
		}
	}

	@Post( "user" )
	@HttpCode( HttpStatus.OK )
	@UseGuards( AuthGuard )
	async findAllByUser( @GetTokenPayload() email: string, @Query() paginationDto: PaginationDto ){

		const user = await this.userService.findByEmail( email );
		const { comentsFound, total } = await this.comentService.findAllByUser( user, paginationDto );

		const coments = await Promise.all( comentsFound.map( async coment => {
				
			const tags = await this.tagComentService.findStack( coment );
				
			return {
					comentario: {
						id: coment.id,
						puntuacion: coment.puntuacion,
						comentario: coment.comentario,
						fecha: coment.fecha
					},
					usuario: {
						nombres: coment.id_usuario.nombres,
						apellidos: coment.id_usuario.apellidos,
						foto_perfil: coment.id_usuario.foto_perfil
					},
					tags
			}
		}));

		return { comentarios: coments, total }
	}

	@Get( "teacher/:id" )
	async findAllByTeacher( 
		@Param( "id", ParseUUIDPipe ) id: string,
		@Query() paginationDto: PaginationDto
	){

		await this.teacherService.findOne( id );
		const { comentsFound, total } = await this.comentService.findAll( id, paginationDto );

		const coments = await Promise.all( comentsFound.map( async coment => {
			
			const tags = await this.tagComentService.findStack( coment );
			
			return {
				comentario: {
					puntuacion: coment.puntuacion,
					comentario: coment.comentario,
					fecha: coment.fecha
				},
				usuario: {
					nombres: coment.id_usuario.nombres,
					apellidos: coment.id_usuario.apellidos,
					foto_perfil: coment.id_usuario.foto_perfil
				},
				tags
			}
		}));

		return { comentarios: coments, total }
	}

	@Put(":id")
	@UseGuards( AuthGuard )
	async update( 
		@GetTokenPayload() email: string,
		@Param("id", ParseUUIDPipe ) id: string,
		@Body() updateComentDto: UpdateComentDto
	){
	
		await this.userService.findByEmail( email );
		await this.comentService.update( id, updateComentDto );

		const coment = await this.comentService.findOne( id );
		const tags = await this.tagComentService.update({ tags_id: updateComentDto.tags, coment });

		return {
			message: "Comentario actualizado con éxito",
			comentario: {
				puntuacion: coment.puntuacion,
				comentario: coment.comentario,
				fecha: coment.fecha
			},
			usuario: {
				nombres: coment.id_usuario.nombres,
				apellidos: coment.id_usuario.apellidos,
				foto_perfil: coment.id_usuario.foto_perfil
			},
			tags
		}
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	async remove( @GetTokenPayload() email: string , @Param( "id", ParseUUIDPipe ) id: string ) {

		const user = await this.userService.findByEmail( email );
		const { teacherID, message } = await this.comentService.remove( id, user );
		
		const { comentsFound, total } = await this.comentService.findAll( teacherID, { page: 1, limit: 1000 } );
		await this.teacherService.updateScore( teacherID, comentsFound, total );
		
		return { message };
	}
}
