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
			
			return coment;

		} catch ( error ) { HandleErrors( error ); }
	}

	async findAll( id: string, paginationDto: PaginationDto ) {

		const { limit = 10, page = 1 } = paginationDto;

		try {

			const comentsFound = await this.comentRepository.find({
				where: { id_profesor: id },
				skip: ( page - 1 ) * limit,
				take: limit
			});

			if ( !comentsFound ) throw new BadRequestException({ mensaje: "No hay comentarios" });
			
			const total = await this.comentRepository.createQueryBuilder( "coment" )
			.where( "coment.id_profesor = :id", { id })
			.getCount();

			return { comentsFound, total };

		} catch ( error ) { HandleErrors( error ); }
	}

	async findAllByUser( user: User, paginationDto: PaginationDto ) {

		const { limit = 10, page = 1 } = paginationDto;

		try {

			const comentsFound = await this.comentRepository.find({
				where: { id_usuario: user },
				skip: ( page - 1 ) * limit,
				take: limit
			});

			if ( !comentsFound ) throw new BadRequestException({ mensaje: "No hay comentarios" });
			
			const total = await this.comentRepository.createQueryBuilder( "coment" )
			.where( "coment.id_usuario = :id", { id: user.id })
			.getCount();

			return { comentsFound, total };

		} catch ( error ) { HandleErrors( error ); }
	}

	async findOne( id: string ) {

		try {

			const comentFound = await this.comentRepository.findOneBy({ id });

			if ( !comentFound ) 
				throw new BadRequestException({ mensaje: "El comentario no existe" });

			return comentFound;

		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateComentDto: UpdateComentDto ) {

		const { id_profesor = "", tags, ...comentData } = updateComentDto;

		try {

			const comentFound = await this.comentRepository.findOneBy({ id });

			if ( !comentFound ) 
				throw new NotFoundException({ mensaje: "El comentario no existe" });

			await this.comentRepository.update( id, { ...comentData, fecha: new Date() });

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string, user: User ) {

		try {
			
			const comentFound = await this.comentRepository.findOneBy({ id });

			if ( !comentFound ) 
				throw new NotFoundException({ mensaje: "El comentario no existe" });

			if ( comentFound.id_usuario.id !== user.id )
				throw new BadRequestException({ mensaje: "No tienes permiso para eliminar este comentario" });

			await this.comentRepository.delete( id );
			
			return { 
				teacherID: comentFound.id_profesor,
				mensaje: "Comentario eliminado con éxito"
			};

		} catch ( error ) { HandleErrors( error ); }

	}
}
