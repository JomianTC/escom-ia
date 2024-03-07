import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, ParseUUIDPipe, Put } from "@nestjs/common";
import { GetTokenPayload } from "../user/decorators/get-token-payload.decorator";
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
		private readonly teacherService: TeacherService
	){}

	@Post()
	@UseGuards( AuthGuard )
	async create( @GetTokenPayload() email: string, @Body() createComentDto: CreateComentDto ) {
		
		const user = await this.userService.findByEmail( email );
		await this.teacherService.findOne( createComentDto.id_profesor );
		
		this.comentService.create( user, createComentDto );
		
		// const comentID = this.comentService.create( user, createComentDto );
		// TODO: Crear Comentario_Tags

		return { message: "Comentario creado con éxito" };
	}

	@Get()
	async findAll( @Query() paginationDto: PaginationDto ) {
		
		const { coments, total } = await this.comentService.findAll( paginationDto );
		
		// TODO: Obtener Comentario_Tags
		// ? Verificar si unicamente con el eager de la entidad Coment es suficiente

		return { coments, total /*, tags */ }
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

		// TODO: Actualizar Comentario_Tags
		// ? Se tendran que eliminar TODOS los tags anteriores y crear los nuevos

		return { 
			message: "Comentario actualizado con éxito",
			comentario: await this.comentService.findOne( id )
		};
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	async remove( @GetTokenPayload() email: string , @Param( "id", ParseUUIDPipe ) id: string ) {

		const user = await this.userService.findByEmail( email );
		
		// TODO: Eliminar Comentario_Tags
		// ? Verificar si funciona el Delete on cascade desde la entidad

		return this.comentService.remove( id, user );
	}
}
