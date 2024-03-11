import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateRequirementDto } from "./dto/create-requirement.dto";
import { UpdateRequirementDto } from "./dto/update-requirement.dto";
import { Requirement } from "./entities/requirement.entity";
import { HandleErrors } from "../common/handle-errors";
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class RequirementsService {

	constructor(
		@InjectRepository( Requirement )
		private readonly requirementRepository: Repository< Requirement >
	) {}

	async create( createRequirementDto: CreateRequirementDto ) {

		try {

			const reqFound = await this.requirementRepository.findOneBy({
				nombre: createRequirementDto.nombre.toLowerCase()
			});

			if ( reqFound ) 
				throw new BadRequestException({ message: "El requerimiento ya existe" });

			const requirement = this.requirementRepository.create( createRequirementDto );
			await this.requirementRepository.save( requirement );

			return { 
				message: "Requerimiento creado exitosamente",
				requirement
			};
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async findAll( paginationDto: PaginationDto ) {

		const { limit = 10, page = 1 } = paginationDto;

		try {

			const [ requirements, total ] = await this.requirementRepository.findAndCount({
				take: limit,
				skip: limit * ( page - 1 )
			});

			return { requirements, total };
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async findOne( id: string ) {

		try {
		
			const reqFound = await this.requirementRepository.findOneBy({ id });
			
			if ( !reqFound ) 
				throw new BadRequestException({ message:  "Requerimiento no registrado" });

			return { requirement: reqFound };

		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateRequirementDto: UpdateRequirementDto ) {

		try {
		
			await this.findOne( id );

			await this.requirementRepository.update( id, updateRequirementDto );

			return { message: "Requerimiento actualizado exitosamente" };

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string ) {

		try {
		
			await this.findOne( id );

			await this.requirementRepository.delete( id );

			return { message: "Requerimiento eliminado exitosamente" };

		} catch ( error ) { HandleErrors( error ); }
	}
}
