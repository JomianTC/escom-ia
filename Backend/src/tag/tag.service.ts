import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaginationDto } from "../common/dto/pagination.dto";
import { HandleErrors } from "../common/handle-errors";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagService {

	constructor(
		@InjectRepository( Tag )
		private readonly tagRepository: Repository< Tag >,
	){}

	async create( createTagDto: CreateTagDto ) {

		try {
		
			const tagFound = await this.tagRepository.findOne({ 
				where: { nombre: createTagDto.nombre.toLowerCase() }
			});

			if ( tagFound ) 
				throw new BadRequestException({ mensaje: "El Tag ya existe" });

			const tag = this.tagRepository.create( createTagDto );
			await this.tagRepository.save( tag );

			return { mensaje: "Tag creado correctamente" }

		} catch ( error ) { HandleErrors( error ); }
	}

	async findAll( paginationDto: PaginationDto ) {

		const { limit = 10, page = 1 } = paginationDto;

		try {

			const tags = await this.tagRepository.find({
				skip: ( page - 1 ) * limit,
				take: limit
			});

			const total = await this.tagRepository.count();

			return { tags, total };
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async findStack( ids: string[] ) {
		try {

			const newArrayTags = ids.map( async ( id ) => {
				
				const tag = await this.tagRepository.findOneBy({ id });
	
				if ( !tag )
					throw new BadRequestException({ mensaje: "El Tag no existe" });

				return tag;
			})

			const tags = await Promise.all( newArrayTags );

			return tags;
		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateTagDto: UpdateTagDto ) {

		const { nombre } = updateTagDto;

		try {

			const tagFound = await this.tagRepository.findOneBy({ id });

			if ( !tagFound )
				throw new BadRequestException({ mensaje: "El Tag no existe" });

			if ( tagFound.nombre === nombre.toLowerCase() )
				throw new BadRequestException({ mensaje: "El Tag ya existe" });

			const updatedTag = await this.tagRepository.save({
				...tagFound,
				nombre: nombre.toLowerCase()
			});

			return { mensaje: "Tag actualizado correctamente", tag: updatedTag }

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string ) {

		try {
			
			const tagFound = await this.tagRepository.findOneBy({ id });

			if ( !tagFound )
				throw new BadRequestException({ mensaje: "El Tag no existe" });

			await this.tagRepository.delete({ id });

			return { mensaje: "Tag eliminado correctamente" }

		} catch ( error ) { HandleErrors( error ); }
	}
}
