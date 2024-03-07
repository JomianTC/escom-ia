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
				throw new BadRequestException({ message: "El Tag ya existe" });

			const tag = this.tagRepository.create( createTagDto );
			await this.tagRepository.save( tag );

			return { message: "Tag creado correctamente" }

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

	async update( id: string, updateTagDto: UpdateTagDto ) {

		const { nombre } = updateTagDto;

		try {

			const tagFound = await this.tagRepository.findOneBy({ id });

			if ( !tagFound )
				throw new BadRequestException({ message: "El Tag no existe" });

			if ( tagFound.nombre === nombre.toLowerCase() )
				throw new BadRequestException({ message: "El Tag ya existe" });

			const updatedTag = await this.tagRepository.save({
				...tagFound,
				nombre: nombre.toLowerCase()
			});

			return { message: "Tag actualizado correctamente", tag: updatedTag }

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string ) {

		try {
			
			const tagFound = await this.tagRepository.findOneBy({ id });

			if ( !tagFound )
				throw new BadRequestException({ message: "El Tag no existe" });

			await this.tagRepository.delete({ id });

			return { message: "Tag eliminado correctamente" }

		} catch ( error ) { HandleErrors( error ); }
	}
}
