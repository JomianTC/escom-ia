import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { Procedure } from "./entities/procedure.entity";
import { HandleErrors } from "../common/handle-errors";
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProcedureService {

	constructor(
		@InjectRepository( Procedure )
		private readonly procedureRepository: Repository< Procedure >
	){}

	// ? Metodos Alumno

	async findAll( paginationDto: PaginationDto ) {
		
		const { limit = 10, page = 1 } = paginationDto;

		try {

			const procedures = await this.procedureRepository.find({
				where: { estado: true },
				order: { nombre: "ASC" },
				take: limit,
				skip: ( page - 1 ) * limit
			});
			
			if ( !procedures.length ) 
				throw new BadRequestException( "No se encontraron trámites" );

			const total = await this.procedureRepository.createQueryBuilder( "procedure" )
			.where( "procedure.estado = :estado", { estado: true })
			.getCount();

			return { procedures, total };
			
		} catch ( error ) { HandleErrors( error ); }
	}
	
	// TODO: findOne -- Tabla requerimientos_tramite

	// ? Metodos Admin

	// TODO: FindAllWithPermissions  -- Tabla admin_tramites AKA Permisos
	// TODO: FindOneWithPermissions  -- Tabla admin_tramites AKA Permisos

	async create( createProcedureDto: CreateProcedureDto ) {

		const { nombre, fechaInicio, fechaTermino, ...procedureData } = createProcedureDto;

		try {

			const procedureFound = await this.procedureRepository.findOneBy({ 
				nombre: nombre.toLowerCase()
			});

			if ( procedureFound ) 
				throw new BadRequestException( "Ya existe un trámite con ese nombre" );

			const newProcedure = this.procedureRepository.create({ 
				nombre,
				...procedureData,
				fechaInicio: new Date( fechaInicio ),
				fechaTermino: new Date( fechaTermino )
			});

			const procedure = await this.procedureRepository.save( newProcedure );
			
			return {
				message: "Trámite creado correctamente",
				procedure
			};
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateProcedureDto: UpdateProcedureDto) {

		const { fechaInicio, fechaTermino, ...procedureData } = updateProcedureDto;

		try {

			const procedure = await this.procedureRepository.findOneBy({ id });

			if ( !procedure ) 
				throw new BadRequestException( "No se encontró el trámite" );

			const procedureFound = await this.procedureRepository.findOneBy({
				nombre: procedureData.nombre.toLowerCase()
			});

			if ( procedureFound ) 
				throw new BadRequestException( "Ya existe un trámite con ese nombre" );
				
			await this.procedureRepository.update( id, {
				...procedureData,
				fechaInicio: new Date( fechaInicio ),
				fechaTermino: new Date( fechaTermino )
			
			});

			return { message: "Trámite actualizado correctamente" };

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string ) {

		try {
			
			const procedure = await this.procedureRepository.findOneBy({ id });

			if ( !procedure ) 
				throw new BadRequestException( "No se encontró el trámite" );

			await this.procedureRepository.update( id, { estado: false } );

			return { message: "El Trámite ahora esta inactivo" };

		} catch ( error ) { HandleErrors( error ); }
	}
}
