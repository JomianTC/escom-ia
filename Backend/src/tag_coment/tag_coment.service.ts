import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateTagComentDto } from "./dto/create-tag_coment.dto";
import { UpdateTagComentDto } from "./dto/update-tag_coment.dto";
import { Coment } from "../coment/entities/coment.entity";
import { TagComent } from "./entities/tag_coment.entity";
import { HandleErrors } from "../common/handle-errors";
import { TagService } from "../tag/tag.service";

type TagInfo = {
	id: string;
	nombre: string;
}

@Injectable()
export class TagComentService {

	constructor(
		@InjectRepository( TagComent )
		private readonly tagComentRepository: Repository< TagComent >,
		private readonly tagService: TagService
	){}

	async create( createTagComentDto: CreateTagComentDto ) {

		const { tags_id, coment } = createTagComentDto;

		try {

			const tagsFound = await this.tagService.findStack( tags_id );

			tagsFound.forEach( async ( tag ) => {
				const tagComent = this.tagComentRepository.create({ tag, coment });
				await this.tagComentRepository.save( tagComent );
			});

		} catch ( error ) { HandleErrors( error ); }
	}

	async findStack( coment: Coment ) {
		
		try {
			
			const tagsComentFound = await this.tagComentRepository.find({
				where: { coment },
			});

			if ( tagsComentFound.length === 0 ) 
				return [ "Sin tags" ];


			return tagsComentFound.map( tag => tag.tag.nombre );

		} catch ( error ) { HandleErrors( error ); }
	}

	async update( updateTagComentDto: UpdateTagComentDto ) {

		const { tags_id, coment } = updateTagComentDto;

		try {

			await Promise.all([
				this.remove( coment ),
				this.create({ tags_id, coment }),
			]);

			return await this.findStack( coment );

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( coment: Coment ) {

		try {

			const tagsComentFound = await this.tagComentRepository.find({
				where: { coment },
			});

			tagsComentFound.forEach( async ( tagComent ) => {
				await this.tagComentRepository.remove( tagComent );
			});
			
		} catch ( error ) { HandleErrors( error ); }
	}
}
