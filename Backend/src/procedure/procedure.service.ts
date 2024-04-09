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
	
	async findOne( id: string ) {
		
		try {
			
			const procedure = await this.procedureRepository.findOneBy({ id });

			if ( !procedure ) 
				throw new BadRequestException( "No se encontró el trámite" );

			return procedure;

		} catch ( error ) { HandleErrors( error ); }
	}

	// ? Metodos Admin

	async findStack( adminProccedures: string[] ) {
		
		try {

			const proceduresPromise = adminProccedures.map( ( adminProcedure ) => {
				return this.procedureRepository.findOneBy({ id: adminProcedure });
			});

			const procedures = await Promise.all( proceduresPromise );

			return procedures;
						
		} catch ( error ) { HandleErrors( error ); }
	}

	async create( createProcedureDto: CreateProcedureDto ) {

		const { nombre, fechaInicio, fechaTermino, links, ...procedureData } = createProcedureDto;

		try {

			const procedureFound = await this.procedureRepository.findOneBy({ 
				nombre: nombre.toLowerCase()
			});

			if ( procedureFound ) 
				throw new BadRequestException( "Ya existe un trámite con ese nombre" );

			const newFechaInicio = new Date( fechaInicio ).toISOString().slice(0, 19).replace('T', ' ');
			const newFechaTermino = new Date( fechaTermino ).toISOString().slice(0, 19).replace('T', ' ');

			let enlaces = "";

			links.forEach( ( link ) => {
				enlaces += `${ link }-----`;
			});

			const newProcedure = this.procedureRepository.create({ 
				nombre,
				...procedureData,
				links: enlaces,
				fechaInicio: new Date( newFechaInicio ),
				fechaTermino: new Date( newFechaTermino ),
			});

			const procedure = await this.procedureRepository.save( newProcedure );
			
			return procedure;
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateProcedureDto: UpdateProcedureDto ) {

		const { requerimentos, links, ...procedureData } = updateProcedureDto;

		try {

			const procedure = await this.procedureRepository.findOneBy({ id });

			if ( !procedure ) 
				throw new BadRequestException( "No se encontró el trámite" );

			if ( procedureData.nombre ) {
				const procedureFound = await this.procedureRepository.findOneBy({
					nombre: procedureData.nombre.toLowerCase()
				});
	
				if ( procedureFound ) 
					throw new BadRequestException( "Ya existe un trámite con ese nombre" );
			}

			if ( links ) {

				let enlaces = "";

				links.forEach( ( link ) => {
					enlaces += `${ link }-----`;
				});

				await this.procedureRepository.update( id, { ...procedureData, links: enlaces });
				
				const { estado } = await this.procedureRepository.findOneBy({ id });

				return estado;
			}

			await this.procedureRepository.update( id, { ...procedureData });
			
			const { estado } = await this.procedureRepository.findOneBy({ id });

			return estado;

		} catch ( error ) { HandleErrors( error ); }
	}

	async updateDate( id: string, updateProcedureDto: UpdateProcedureDto ) {

		const { fechaInicio = null, fechaTermino = null } = updateProcedureDto;

		try {

			const procedure = await this.procedureRepository.findOneBy({ id });

			const newFechaInicio = new Date( fechaInicio ).toISOString().slice(0, 19).replace('T', ' ');
			const newFechaTermino = new Date( fechaTermino ).toISOString().slice(0, 19).replace('T', ' ');

			if ( fechaInicio === null && fechaTermino === null )
				return { message: "X" };

			if ( fechaInicio && fechaTermino ){

				await this.procedureRepository.update( id, {
					fechaInicio: new Date( newFechaInicio ),
					fechaTermino: new Date( newFechaTermino ),
				});

				return { message: `Se han modificado las fechas para el tramite: ${ procedure.nombre }` };
			}

			if ( fechaInicio )
				await this.procedureRepository.update( id, {
					fechaInicio: new Date( newFechaInicio ),
				});

			if ( fechaTermino )
				await this.procedureRepository.update( id, {
					fechaTermino: new Date( newFechaTermino ),
				});

			return { message: `Se ha modificado la fecha para el tramite: ${ procedure.nombre }` };

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string, estado: boolean ) {

		try {
			
			const procedure = await this.procedureRepository.findOneBy({ id });

			if ( !procedure ) 
				throw new BadRequestException( "No se encontró el trámite" );

			if ( procedure.estado === estado )
				throw new BadRequestException( "El trámite no puede cambiar de estado" );

			await this.procedureRepository.update( id, { estado } );

			if ( estado ) return { message: "El Trámite ahora esta activo" };
			else return { message: "El Trámite ahora esta inactivo" };
		
		} catch ( error ) { HandleErrors( error ); }
	}
}
