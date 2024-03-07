import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateComentDto } from "./dto/create-coment.dto";
import { UpdateComentDto } from "./dto/update-coment.dto";
import { HandleErrors } from "../common/handle-errors";
import { User } from "../auth/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Coment } from "./entities/coment.entity";

@Injectable()
export class ComentService {

	constructor(
		@InjectRepository( Coment )
		private comentRepository: Repository< Coment >
	){}
	
	async create( user: User, createComentDto: CreateComentDto ) {
		
		try {

			const coment = this.comentRepository.create({
				...createComentDto,
				id_usuario: user,
				fecha: new Date()
			});

			await this.comentRepository.save( coment );
			
			return coment.id;

		} catch ( error ) { HandleErrors( error ); }
	}

	async findAll( paginationDto: PaginationDto ) {

		const { limit = 10, page = 1 } = paginationDto;

		try {

			const comentsFound = await this.comentRepository.find({
				skip: ( page - 1 ) * limit,
				take: limit
			});

			if ( !comentsFound ) throw new BadRequestException({ message: "No hay comentarios" });

			const coments = comentsFound.map( coment => {
				const { id, puntuacion, comentario, fecha, id_usuario } = coment;
				const { nombres, apellidos, foto_perfil } = id_usuario;
				return {
					comentario: {
						id,
						puntuacion,
						comentario,
						fecha
					},
					usuario: {
						nombres,
						apellidos,
						foto_perfil
					}
				}
			});
			
			const total = await this.comentRepository.count();

			return { coments, total };

		} catch ( error ) { HandleErrors( error ); }
	}

	async findOne( id: string ) {

		try {

			const comentFound = await this.comentRepository.findOneBy({ id });

			if ( !comentFound ) 
				throw new BadRequestException({ message: "El comentario no existe" });

			return {
				comentario: {
					puntuacion: comentFound.puntuacion,
					comentario: comentFound.comentario,
					fecha: comentFound.fecha
				},
				usuario: {
					nombres: comentFound.id_usuario.nombres,
					apellidos: comentFound.id_usuario.apellidos,
					foto_perfil: comentFound.id_usuario.foto_perfil
				}
			}

		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateComentDto: UpdateComentDto ) {

		const { id_profesor = "", ...comentData } = updateComentDto;

		try {

			const comentFound = await this.comentRepository.findOneBy({ id });

			if ( !comentFound ) 
				throw new NotFoundException({ message: "El comentario no existe" });

			await this.comentRepository.update( id, { ...comentData, fecha: new Date() });

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string, user: User ) {

		try {
			
			const comentFound = await this.comentRepository.findOneBy({ id });

			if ( !comentFound ) 
				throw new NotFoundException({ message: "El comentario no existe" });

			if ( comentFound.id_usuario.id !== user.id )
				throw new BadRequestException({ message: "No tienes permiso para eliminar este comentario" });

			await this.comentRepository.delete( id );
			
			return { message: "Comentario eliminado con éxito" };

		} catch ( error ) { HandleErrors( error ); }

	}
}